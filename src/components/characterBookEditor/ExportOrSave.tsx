import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { createCharacterBook } from '@/services/characterBooks'
import { setCharacterBookEditor } from '@/state/characterBookEditorSlice'
import { setAlert } from '@/state/feedbackSlice'
import { type CharacterBookDatabaseData, type CharacterBookEditorState } from '@/types/lorebook'
import { characterBookToJSONUrl, characterEditorToCharacterBook } from '@/utilities/characterBookUtilities'
import { Box, Button, Typography } from '@mui/material'
import { useCallback, type FC } from 'react'

const ExportOrSave: FC = () => {
  const dispatch = useAppDispatch()
  const characterBookEditor = useAppSelector((theme) => theme.characterBookEditor)

  const handleCreate = useCallback(async (data: CharacterBookEditorState): Promise<CharacterBookDatabaseData> => {
    const createdCharacterBook = await createCharacterBook(data)
    return createdCharacterBook
  }, [])

  const handleUpdate = useCallback(async (data: CharacterBookEditorState): Promise<CharacterBookDatabaseData> => {
    const updatedCharacterBook = await createCharacterBook(data)
    return updatedCharacterBook
  }, [])

  const handleDownload = useCallback((JSONUrl: string, fileName: string) => {
    const link = document.createElement('a')
    link.href = JSONUrl
    link.download = fileName
    link.click()
  }, [])

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>Export or Save</Typography>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: theme.spacing(2),
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          }
        })}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>Save</Typography>
          {characterBookEditor.id === undefined && (
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                handleCreate(characterBookEditor)
                  .then((created) => {
                    dispatch(setCharacterBookEditor(created))
                    dispatch(setAlert({
                      title: 'Character book created',
                      message: 'Character book created successfully.',
                      severity: 'success'
                    }))
                  })
                  .catch((error) => {
                    if (error instanceof Error) {
                      dispatch(setAlert({
                        title: 'Error while creating character book',
                        message: error.message,
                        severity: 'error'
                      }))
                    } else {
                      dispatch(setAlert({
                        title: 'Error while creating character book',
                        message: 'An unknown error occurred.',
                        severity: 'error'
                      }))
                    }
                  })
              }}
            >
              Save
            </Button>
          )}
          {characterBookEditor.id !== undefined && (
            <>
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  handleUpdate(characterBookEditor)
                    .then((updated) => {
                      dispatch(setCharacterBookEditor(updated))
                      dispatch(setAlert({
                        title: 'Character book updated',
                        message: 'Character book updated successfully.',
                        severity: 'success'
                      }))
                    })
                    .catch((error) => {
                      if (error instanceof Error) {
                        dispatch(setAlert({
                          title: 'Error while updating character book',
                          message: error.message,
                          severity: 'error'
                        }))
                      } else {
                        dispatch(setAlert({
                          title: 'Error while updating character book',
                          message: 'An unknown error occurred.',
                          severity: 'error'
                        }))
                      }
                    })
                }}
              >
                Update
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => {
                  handleCreate(characterBookEditor)
                    .then((created) => {
                      dispatch(setCharacterBookEditor(created))
                      dispatch(setAlert({
                        title: 'Character book created',
                        message: 'Character book created successfully.',
                        severity: 'success'
                      }))
                    })
                    .catch((error) => {
                      if (error instanceof Error) {
                        dispatch(setAlert({
                          title: 'Error while creating character book',
                          message: error.message,
                          severity: 'error'
                        }))
                      } else {
                        dispatch(setAlert({
                          title: 'Error while creating character book',
                          message: 'An unknown error occurred.',
                          severity: 'error'
                        }))
                      }
                    })
                }}
              >
                Save as new
              </Button>
            </>
          )}
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Typography variant="h3" align="center" gutterBottom>Export</Typography>
          <Typography variant="h4" align="center" gutterBottom>Character Book</Typography>
          <Typography variant="caption" sx={(theme) => ({ color: theme.palette.warning.main })}>
            This format is not intended to be imported into SillyTavern, because it will generate errors and bugs, it is intended only for backups and sharing character books.
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              const CharacterBook = characterEditorToCharacterBook(characterBookEditor)
              const JSONUrl = characterBookToJSONUrl(CharacterBook)
              handleDownload(JSONUrl, `${characterBookEditor.name}-characterBook.json`)
            }}
          >
            JSON
          </Button>
        </div>
      </Box>
    </>
  )
}
export default ExportOrSave
