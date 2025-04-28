import useAppDispatch from '@/hooks/useAppDispatch'
import { dataBase } from '@/lib/dexie'
import { deleteCharacter } from '@/services/character'
import { setCharacterEditor } from '@/state/characterEditorSlice'
import { setAlert, setDialog } from '@/state/feedbackSlice'
import { type CharacterDatabaseData } from '@/types/character'
import { faPencil, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Tooltip } from '@mui/material'
import {
  DataGrid,
  type GridActionsColDef,
  type GridColDef,
  type GridFilterModel,
  type GridPaginationModel,
  type GridRenderCellParams,
  type GridSortModel,
  getGridStringOperators
} from '@mui/x-data-grid'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const renderImage = (
  params: GridRenderCellParams<CharacterDatabaseData>
): React.ReactNode => (
  <div
    css={{
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
      width: '100%',
      aspectRatio: '1'
    }}
  >
    <img
      css={{
        objectFit: 'cover'
      }}
      src={params.value}
    />
  </div>
)

const filterOperators = getGridStringOperators().filter(
  (operator) => operator.value !== 'isAnyOf'
)

const CharacterTable: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 0
  })
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const characters = useLiveQuery(async () => {
    setIsLoading(true)
    const characters = dataBase.characters
    const sortedCharacters =
      sortModel.length === 0
        ? characters.toCollection()
        : sortModel[0].sort === 'asc'
          ? characters.orderBy(sortModel[0].field)
          : characters.orderBy(sortModel[0].field).reverse()
    const filteredCharacters = sortedCharacters.filter((character) => {
      if (filterModel.items.length === 0) {
        return true
      }
      const fieldToFilter = filterModel.items[0].field as
        | 'name'
        | 'description'
        | 'personality'
        | 'creator'
        | 'creator_notes'
        | 'character_version'
        | 'tags'
        | 'system_prompt'
        | 'post_history_instructions'
      const filterValue = (filterModel.items[0].value as string) ?? ''
      if (fieldToFilter === undefined || filterValue === undefined) {
        return true
      }
      switch (filterModel.items[0].operator) {
        case 'equals':
          if (fieldToFilter === 'tags') {
            return character[fieldToFilter].some((tag) => tag === filterValue)
          }
          return character[fieldToFilter] === filterValue
        case 'startsWith':
          if (fieldToFilter === 'tags') {
            return character[fieldToFilter].some((tag) =>
              tag.startsWith(filterValue)
            )
          }
          return character[fieldToFilter].startsWith(filterValue)
        case 'endsWith':
          if (fieldToFilter === 'tags') {
            return character[fieldToFilter].some((tag) =>
              tag.endsWith(filterValue)
            )
          }
          return character[fieldToFilter].endsWith(filterValue)
        case 'isEmpty':
          if (fieldToFilter === 'tags') {
            return character[fieldToFilter].length === 0
          }
          return character[fieldToFilter] === ''
        case 'isNotEmpty':
          if (fieldToFilter === 'tags') {
            return character[fieldToFilter].length > 0
          }
          return character[fieldToFilter] !== ''
        case 'contains':
        default:
          if (fieldToFilter === 'tags') {
            return character[fieldToFilter].some((tag) =>
              tag.includes(filterValue)
            )
          }
          return character[fieldToFilter].includes(filterValue)
      }
    })
    setTotalCharacters(await filteredCharacters.count())
    const paginatedCharacters = filteredCharacters
      .offset(paginationModel.page * paginationModel.pageSize)
      .limit(paginationModel.pageSize)
    const charactersArray = await paginatedCharacters.toArray()
    setIsLoading(false)
    return charactersArray
  }, [paginationModel, sortModel, filterModel])

  const renderActions: GridActionsColDef<CharacterDatabaseData>['getActions'] =
    useCallback(
      (params) => [
        <Tooltip
          key={`edit-${params.row.id}`}
          title="Edit"
        >
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                setDialog({
                  title: 'Edit character?',
                  content:
                    'if you have unsaved information in the editor it will be lost.',
                  actions: [
                    {
                      label: 'Cancel',
                      severity: 'inherit'
                    },
                    {
                      label: 'Edit',
                      onClick: () => {
                        dispatch(setCharacterEditor(params.row))
                        navigate('/character-editor?tab=character-data')
                      },
                      severity: 'success'
                    }
                  ]
                })
              )
            }}
          >
            <FontAwesomeIcon
              icon={faPencil}
              fixedWidth
              size="sm"
            />
          </IconButton>
        </Tooltip>,
        <Tooltip
          key={`delete-${params.row.id}`}
          title="Delete"
        >
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                setDialog({
                  title: 'Delete character?',
                  content: 'This action cannot be undone.',
                  actions: [
                    {
                      label: 'Cancel',
                      severity: 'inherit'
                    },
                    {
                      label: 'Delete',
                      severity: 'error',
                      onClick: () => {
                        deleteCharacter(params.row.id)
                          .then(() => {
                            dispatch(
                              setAlert({
                                title: 'Character deleted',
                                message: `Character ${params.row.name} deleted`,
                                severity: 'success'
                              })
                            )
                          })
                          .catch((error) => {
                            if (error instanceof Error) {
                              dispatch(
                                setAlert({
                                  title: 'Error deleting character',
                                  message: error.message,
                                  severity: 'error'
                                })
                              )
                            } else {
                              dispatch(
                                setAlert({
                                  title: 'Error deleting character',
                                  message: `Character ${params.row.name} could not be deleted`,
                                  severity: 'error'
                                })
                              )
                            }
                          })
                      }
                    }
                  ]
                })
              )
            }}
          >
            <FontAwesomeIcon
              icon={faTrashAlt}
              fixedWidth
              size="sm"
            />
          </IconButton>
        </Tooltip>,
        <Tooltip
          key={`edit-as-new-${params.row.id}`}
          title="Edit as new"
        >
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                setDialog({
                  title: 'Edit as new character?',
                  content:
                    'if you have unsaved information in the editor it will be lost.',
                  actions: [
                    {
                      label: 'Cancel',
                      severity: 'inherit'
                    },
                    {
                      label: 'Edit',
                      onClick: () => {
                        dispatch(
                          setCharacterEditor({
                            ...params.row,
                            id: undefined
                          })
                        )
                        navigate('/character-editor?tab=character-data')
                      },
                      severity: 'success'
                    }
                  ]
                })
              )
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              fixedWidth
              size="sm"
            />
          </IconButton>
        </Tooltip>
      ],
      []
    )

  const columns: Array<GridColDef<CharacterDatabaseData>> = [
    {
      field: 'actions',
      type: 'actions',
      hideable: false,
      sortable: false,
      minWidth: 120,
      getActions: renderActions,
      filterable: false
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 150,
      sortable: false,
      filterable: false
    },
    {
      field: 'image',
      headerName: 'Image',
      width: 75,
      sortable: false,
      renderCell: renderImage,
      filterable: false
    },
    { field: 'name', headerName: 'Name', width: 200, filterOperators },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      sortable: false,
      filterOperators
    },
    {
      field: 'personality',
      headerName: 'Personality',
      flex: 1,
      sortable: false,
      filterOperators
    },
    {
      field: 'mes_example',
      headerName: 'Messages Example',
      flex: 1,
      sortable: false,
      filterable: false
    },
    {
      field: 'scenario',
      headerName: 'Scenario',
      flex: 1,
      sortable: false,
      filterOperators
    },
    {
      field: 'first_mes',
      headerName: 'First Message',
      flex: 1,
      sortable: false,
      filterOperators
    },
    {
      field: 'alternate_greetings',
      headerName: 'Alternate Greetings',
      flex: 1,
      sortable: false,
      filterable: false
    },
    { field: 'creator', headerName: 'Creator', flex: 0, filterOperators },
    {
      field: 'creator_notes',
      headerName: 'Creator Notes',
      flex: 1,
      sortable: false,
      filterOperators
    },
    { field: 'character_version', headerName: 'Version', width: 100 },
    {
      field: 'tags',
      headerName: 'Tags',
      flex: 1,
      valueGetter: (_, row) => row.tags.join(', '),
      sortable: false,
      filterOperators
    },
    {
      field: 'system_prompt',
      headerName: 'System Prompt',
      flex: 1,
      sortable: false,
      filterOperators
    },
    {
      field: 'post_history_instructions',
      headerName: 'Post History Instructions',
      flex: 1,
      sortable: false,
      filterOperators
    }
  ]

  return (
    <div
      css={{
        height: 'calc(100vh - 210px)',
        minHeight: 'calc(75vh)'
      }}
    >
      <DataGrid
        initialState={{
          columns: {
            columnVisibilityModel: {
              id: false,
              description: false,
              personality: false,
              mes_example: false,
              scenario: false,
              first_mes: false,
              alternate_greetings: false,
              creator_notes: false,
              system_prompt: false,
              post_history_instructions: false
            }
          }
        }}
        loading={isLoading}
        rows={characters ?? []}
        rowCount={totalCharacters}
        columns={columns}
        rowSelection={false}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        sortingMode="server"
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        autoPageSize={true}
      />
    </div>
  )
}
export default CharacterTable
