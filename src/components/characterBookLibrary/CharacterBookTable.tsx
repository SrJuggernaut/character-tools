import useAppDispatch from '@/hooks/useAppDispatch'
import { dataBase } from '@/lib/dexie'
import { deleteCharacter } from '@/services/character'
import { setAlert, setDialog } from '@/state/feedbackSlice'
import { type CharacterBookDatabaseData } from '@/types/lorebook'
import { faPencil, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import { DataGrid, type GridActionsColDef, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from '@mui/x-data-grid'
import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const CharacterBookTable: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 0 })
  const [totalCharacterBooks, setTotalCharacterBooks] = useState(0)
  const [filterModel, setFilterModel] = useState<GridFilterModel>({ items: [] })
  const [sortModel, setSortModel] = useState<GridSortModel>([])

  const characterBooks = useLiveQuery(async () => {
    setIsLoading(true)
    const characterBooks = dataBase.characterBooks
    const sortedCharacterBooks = sortModel.length === 0
      ? characterBooks.toCollection()
      : sortModel[0].sort === 'asc'
        ? characterBooks.orderBy(sortModel[0].field)
        : characterBooks.orderBy(sortModel[0].field).reverse()
    const filteredCharacterBooks = sortedCharacterBooks.filter((characterBook) => {
      if (filterModel.items.length === 0) {
        return true
      }
      const fieldToFilter = filterModel.items[0].field as 'name' | 'description'
      const filterValue = filterModel.items[0].value as string ?? ''
      if (fieldToFilter === undefined || filterValue === undefined) {
        return true
      }
      switch (filterModel.items[0].operator) {
        case 'contains':
          return characterBook[fieldToFilter]?.toLowerCase().includes(filterValue.toLowerCase()) ?? false
        case 'startsWith':
          return characterBook[fieldToFilter]?.toLowerCase().startsWith(filterValue.toLowerCase()) ?? false
        case 'endsWith':
          return characterBook[fieldToFilter]?.toLowerCase().endsWith(filterValue.toLowerCase()) ?? false
        case 'equals':
          return characterBook[fieldToFilter]?.toLowerCase() === filterValue.toLowerCase() ?? false
        case 'notEquals':
          return characterBook[fieldToFilter]?.toLowerCase() !== filterValue.toLowerCase() ?? false
        case 'is':
          return characterBook[fieldToFilter]?.toLowerCase() === filterValue.toLowerCase() ?? false
        case 'isNot':
          return characterBook[fieldToFilter]?.toLowerCase() !== filterValue.toLowerCase() ?? false
        default:
          return true
      }
    })
    const totalCharacterBooks = await filteredCharacterBooks.count()
    setTotalCharacterBooks(totalCharacterBooks)
    const paginatedCharacterBooks = await filteredCharacterBooks.offset(paginationModel.page * paginationModel.pageSize).limit(paginationModel.pageSize).toArray()
    setIsLoading(false)
    return paginatedCharacterBooks
  })

  const renderActions: GridActionsColDef<CharacterBookDatabaseData>['getActions'] = useCallback((params) => [
    <IconButton key={`edit-${params.row.id}`} size='small' onClick={() => {
      dispatch(setDialog({
        title: 'Edit character?',
        content: 'if you have unsaved information in the editor it will be lost.',
        cancelText: 'Cancel',
        onCancel: () => { },
        confirmText: 'Edit',
        onConfirm: () => {
          // dispatch(setCharacterEditor(params.row))
          navigate('/character-editor?tab=character-data')
        }
      }))
    }}>
      <FontAwesomeIcon icon={faPencil} fixedWidth size="sm" />
    </IconButton>,
    <IconButton key={`delete-${params.row.id}`} size='small' onClick={() => {
      dispatch(setDialog({
        title: 'Delete character?',
        content: 'This action cannot be undone.',
        cancelText: 'Cancel',
        onCancel: () => {},
        confirmText: 'Delete',
        onConfirm: () => {
          deleteCharacter(params.row.id)
            .then(() => {
              dispatch(setAlert({
                title: 'Character deleted',
                message: 'Character Book deleted',
                severity: 'success'
              }))
            })
            .catch((error) => {
              if (error instanceof Error) {
                dispatch(setAlert({
                  title: 'Error deleting character',
                  message: error.message,
                  severity: 'error'
                }))
                return
              }
              dispatch(setAlert({
                title: 'Error deleting character',
                message: 'Character Book could not be deleted',
                severity: 'error'
              }))
            })
        }
      }))
    }}>
      <FontAwesomeIcon icon={faTrashAlt} fixedWidth size="sm" />
    </IconButton>,
    <IconButton key={`edit-as-new-${params.row.id}`} size='small' onClick={() => {
      dispatch(setDialog({
        title: 'Edit as new character?',
        content: 'if you have unsaved information in the editor it will be lost.',
        cancelText: 'Cancel',
        onCancel: () => { },
        confirmText: 'Edit',
        onConfirm: () => {
          // TODO: dispatch
          navigate('/character-editor?tab=character-data')
        }
      }))
    }
    }>
      <FontAwesomeIcon icon={faPlus} fixedWidth size="sm" />
    </IconButton>
  ], [])

  const columns: Array<GridColDef<CharacterBookDatabaseData>> = [
    { field: 'actions', type: 'actions', hideable: false, sortable: false, minWidth: 120, getActions: renderActions, filterable: false },
    { field: 'id', headerName: 'ID', width: 150, sortable: false, filterable: false },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 120, type: 'string', filterable: true, sortable: true },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 120, type: 'string', filterable: true, sortable: true }
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
              id: false
            }
          }
        }}
        loading={isLoading}
        rows={characterBooks ?? []}
        rowCount={totalCharacterBooks}
        columns={columns}
        rowSelection={false}
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        filterMode='server'
        filterModel={filterModel}
        onFilterModelChange={setFilterModel}
        sortingMode='server'
        sortModel={sortModel}
        onSortModelChange={setSortModel}
        autoPageSize={true}
      />
    </div>
  )
}

export default CharacterBookTable
