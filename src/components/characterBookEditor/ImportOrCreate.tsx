import Drop from '@/components/ui/Drop'
import useAppDispatch from '@/hooks/useAppDispatch'
import {
  clearCharacterBookEditor,
  setCharacterBookEditor,
  setExampleCharacterBookEditor
} from '@/state/characterBookEditorSlice'
import { setAlert } from '@/state/feedbackSlice'
import { characterBookToCharacterEditor } from '@/utilities/characterBookUtilities'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import { type FC, useCallback } from 'react'

const ImportOrCreate: FC = () => {
  const dispatch = useAppDispatch()

  const handleDrop = useCallback(async (file: File) => {
    const text = await file.text()
    const characterBook = JSON.parse(text)
    const editorState = characterBookToCharacterEditor(characterBook)
    dispatch(setCharacterBookEditor(editorState))
  }, [])
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
      >
        Import or Create
      </Typography>
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
              accept: {
                'application/json': ['.json']
              },
              multiple: false,
              onDropAccepted: (acceptedFiles: File[]) => {
                handleDrop(acceptedFiles[0])
                  .then(() => {
                    dispatch(
                      setAlert({
                        title: 'Character book imported',
                        message:
                          'The character book has been imported successfully',
                        severity: 'success'
                      })
                    )
                  })
                  .catch((error) => {
                    if (error instanceof Error) {
                      dispatch(
                        setAlert({
                          title: 'Error while importing character book',
                          message: error.message,
                          severity: 'error'
                        })
                      )
                    } else {
                      dispatch(
                        setAlert({
                          title: 'Error while importing character book',
                          message: 'The character book could not be imported',
                          severity: 'error'
                        })
                      )
                    }
                  })
              }
            }}
          >
            <FontAwesomeIcon
              icon={faFileUpload}
              size="3x"
            />
            <Typography
              variant="body1"
              align="center"
              gutterBottom
            >
              Drag &amp; drop your character book file here, or click to select
              file
            </Typography>
            <Typography
              variant="caption"
              align="center"
              gutterBottom
            >
              Supported file types: .json
            </Typography>
            <Button
              variant="contained"
              color="primary"
            >
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
          <Typography
            variant="subtitle1"
            component="h2"
            align="center"
            gutterBottom
          >
            Create a new character book
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch(clearCharacterBookEditor())
            }}
          >
            Clean character book editor
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch(setExampleCharacterBookEditor())
            }}
          >
            load example character book
          </Button>
        </div>
      </Box>
    </>
  )
}
export default ImportOrCreate
