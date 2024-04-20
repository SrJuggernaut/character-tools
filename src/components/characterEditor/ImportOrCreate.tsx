import Drop from '@/components/ui/Drop'
import useAppDispatch from '@/hooks/useAppDispatch'
import { createCharacterBook } from '@/services/characterBooks'
import { clearCharacterEditor, loadExampleCharacter, setCharacterEditor } from '@/state/characterEditorSlice'
import { setAlert, setDialog } from '@/state/feedbackSlice'
import { type CharacterEditorState } from '@/types/character'
import { characterBookToCharacterEditor, extractCharacterBookFromCharacter } from '@/utilities/characterBookUtilities'
import { extractCharacterData, importedToCharacterEditorState } from '@/utilities/characterUtilities'
import imageToPng from '@/utilities/imageToPng'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import { useCallback, type FC } from 'react'

const ImportOrCreate: FC = () => {
  const dispatch = useAppDispatch()

  const handleImport = useCallback(async (file: File): Promise<CharacterEditorState> => {
    const extracted = await extractCharacterData(file)
    const image = extracted.image !== undefined ? await imageToPng(extracted.image) : undefined
    const character = importedToCharacterEditorState(extracted.character)
    const characterBook = extractCharacterBookFromCharacter(extracted.character)
    if (characterBook !== undefined) {
      const characterBookEditor = characterBookToCharacterEditor(characterBook)
      dispatch(setDialog({
        title: 'Import CharacterBook',
        content: (
          <>
            <Typography gutterBottom>
              A character book has been found in the imported file.
            </Typography>
          </>
        ),
        actions: [
          {
            label: 'ignore',
            severity: 'inherit',
            onClick: () => {}
          },
          {
            label: 'Import',
            severity: 'success',
            onClick: () => {
              createCharacterBook(characterBookEditor)
                .then((characterBookAdded) => {
                  dispatch(setCharacterEditor({
                    ...character,
                    character_book: characterBookAdded.id
                  }))
                  dispatch(setAlert({
                    title: 'CharacterBook imported',
                    message: 'The character book has been imported successfully',
                    severity: 'success'
                  }))
                })
                .catch((error) => {
                  if (error instanceof Error) {
                    dispatch(setAlert({
                      title: 'Error while importing character book',
                      message: error.message,
                      severity: 'error'
                    }))
                  }
                  dispatch(setAlert({
                    title: 'Error while importing character book',
                    message: 'The character book could not be imported',
                    severity: 'error'
                  }))
                })
            }
          }
        ]
      }))
    }
    return {
      ...character,
      image
    }
  }, [])

  const onDropAccepted = useCallback((files: File[]): void => {
    handleImport(files[0])
      .then((characterEditorState) => {
        dispatch(setCharacterEditor(characterEditorState))
        dispatch(setAlert({
          title: 'Character imported',
          message: 'The character has been imported successfully',
          severity: 'success'
        }))
      })
      .catch((error) => {
        if (error instanceof Error) {
          dispatch(setAlert({
            title: 'Error while importing character',
            message: error.message,
            severity: 'error'
          }))
        }
        dispatch(setAlert({
          title: 'Error while importing character',
          message: 'The character could not be imported',
          severity: 'error'
        }))
      })
  }, [handleImport])

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>Import or Create</Typography>
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
        <div>
          <Drop
            dropzoneOptions={{
              onDropAccepted,
              accept: {
                'image/png': ['.png'],
                'image/webp': ['.webp'],
                'application/json': ['.json']
              },
              multiple: false
            }}
          >
            <FontAwesomeIcon icon={faFileUpload} size="3x" />
            <Typography variant="body1" align="center" gutterBottom>
              Drag &amp; drop your character file here, or click to select file
            </Typography>
            <Typography variant="caption" align="center" gutterBottom>
              Supported file types: .png, .webp, .json
            </Typography>
            <Button variant="contained" color="primary">
              Upload
            </Button>
          </Drop>
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="subtitle1" component="h2" align="center" gutterBottom>
            Create a new character
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch(clearCharacterEditor())
            }}
          >
            Clean character editor
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch(loadExampleCharacter())
            }}
          >
            load example character
          </Button>
        </div>
      </Box>
    </>
  )
}

export default ImportOrCreate
