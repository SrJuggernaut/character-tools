import useAppDispatch from '@/hooks/useAppDispatch'
import { dataBase } from '@/lib/dexie'
import { deleteCharacterBook } from '@/services/characterBooks'
import { setCharacterBookEditor } from '@/state/characterBookEditorSlice'
import { setAlert, setDialog } from '@/state/feedbackSlice'
import { type CharacterBookDatabaseData } from '@/types/lorebook'
import { faPencil, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Tooltip } from '@mui/material'
import { DataGrid, type GridActionsColDef, type GridColDef, type GridFilterModel, type GridPaginationModel, type GridSortModel } from '@mui/x-data-grid'
import { useLiveQuery } from 'dexie-react-hooks'
import { useCallback, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const CharacterBookTable: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 10 })
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
  }, [paginationModel, filterModel, sortModel])

  const renderActions: GridActionsColDef<CharacterBookDatabaseData>['getActions'] = useCallback((params) => [
    <Tooltip key={`edit-${params.row.id}`} title='Edit'>
      <IconButton size='small' onClick={() => {
        dispatch(setDialog({
          title: 'Edit character?',
          content: 'if you have unsaved information in the editor it will be lost.',
          actions: [
            {
              label: 'Cancel',
              severity: 'inherit',
              onClick: () => {}
            },
            {
              label: 'Edit',
              severity: 'success',
              onClick: () => {
                dispatch(setCharacterBookEditor(params.row))
                navigate('/characterbook-editor?tab=characterbook-data')
              }
            }
          ]
        }))
      }}>
        <FontAwesomeIcon icon={faPencil} fixedWidth size="sm" />
      </IconButton>
    </Tooltip>,
    <Tooltip key={`delete-${params.row.id}`} title='Delete'>
      <IconButton size='small' onClick={() => {
        dispatch(setDialog({
          title: 'Delete character?',
          content: 'This action cannot be undone.',
          actions: [
            {
              label: 'Cancel',
              severity: 'inherit',
              onClick: () => {}
            },
            {
              label: 'Delete',
              severity: 'error',
              onClick: () => {
                deleteCharacterBook(params.row.id)
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
            }
          ]
        }))
      }}>
        <FontAwesomeIcon icon={faTrashAlt} fixedWidth size="sm" />
      </IconButton>
    </Tooltip>,
    <Tooltip key={`edit-as-new-${params.row.id}`} title='Edit as new'>
      <IconButton key={`edit-as-new-${params.row.id}`} size='small' onClick={() => {
        dispatch(setDialog({
          title: 'Edit as new character?',
          content: 'if you have unsaved information in the editor it will be lost.',
          // cancelText: 'Cancel',
          // onCancel: () => { },
          // confirmText: 'Edit',
          // onConfirm: () => {
          //   dispatch(setCharacterBookEditor({ ...params.row, id: undefined }))
          //   navigate('/characterbook-editor?tab=characterbook-data')
          // }
          actions: [
            {
              label: 'Cancel',
              severity: 'inherit',
              onClick: () => {}
            },
            {
              label: 'Edit',
              severity: 'success',
              onClick: () => {
                dispatch(setCharacterBookEditor({ ...params.row, id: undefined }))
                navigate('/characterbook-editor?tab=characterbook-data')
              }
            }
          ]
        }))
      }
      }>
        <FontAwesomeIcon icon={faPlus} fixedWidth size="sm" />
      </IconButton>
    </Tooltip>
  ], [])

  const columns: Array<GridColDef<CharacterBookDatabaseData>> = [
    { field: 'actions', type: 'actions', hideable: false, sortable: false, minWidth: 120, getActions: renderActions, filterable: false },
    { field: 'id', headerName: 'ID', width: 150, sortable: true, filterable: true },
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 120, type: 'string', filterable: true, sortable: true },
    { field: 'description', headerName: 'Description', flex: 1, minWidth: 120, type: 'string', filterable: false, sortable: false },
    { field: 'scan_depth', headerName: 'Scan Depth', flex: 0, minWidth: 40, type: 'number', filterable: false, sortable: false },
    { field: 'token_budget', headerName: 'Token Budget', flex: 0, minWidth: 40, type: 'number', filterable: false, sortable: false },
    { field: 'recursive_scanning', headerName: 'Recursive Scanning', flex: 0, minWidth: 40, type: 'boolean', filterable: false, sortable: false }
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
