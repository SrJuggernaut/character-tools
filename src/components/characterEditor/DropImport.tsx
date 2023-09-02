import useAppDispatch from '@/hooks/useAppDispatch'
import { setCharacterEditor } from '@/state/characterEditorSlice'
import { setAlert } from '@/state/feedbackSlice'
import { type CharacterEditorState } from '@/types/character'
import { importedToCharacterEditorState } from '@/utilities/characterUtilities'
import extractCharacterData from '@/utilities/extractCharacterData'
import imageToPng from '@/utilities/imageToPng'
import { faFileUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import { useCallback, type FC } from 'react'
import { useDropzone } from 'react-dropzone'

const DropImport: FC = () => {
  const dispatch = useAppDispatch()

  const handleImport = async (file: File): Promise<CharacterEditorState> => {
    const extracted = await extractCharacterData(file)
    const image = extracted.image !== undefined ? await imageToPng(extracted.image) : undefined
    const character = importedToCharacterEditorState(extracted.character)
    return {
      ...character,
      image
    }
  }

  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      handleImport(file)
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
    })
  }, [])

  const { getRootProps, getInputProps, isDragAccept, isDragReject, isDragActive } = useDropzone({
    onDropAccepted,
    accept: {
      'image/png': ['.png'],
      'image/webp': ['.webp'],
      'application/json': ['.json']
    },
    multiple: false
  })
  return (
    <>
      <Typography variant="subtitle1" component="h2" align="center" gutterBottom>
        Upload a character file
      </Typography>
      <Box
        {...getRootProps()}
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: theme.spacing(2),
          width: '100%',
          padding: theme.spacing(2),
          aspectRatio: '2/1',
          border: `2px dashed ${
            isDragAccept
              ? theme.palette.success.main
              : isDragReject
                ? theme.palette.error.main
                : theme.palette.divider
          }`,
          borderRadius: theme.shape.borderRadius,
          backgroundColor: isDragActive ? theme.palette.action.hover : undefined
        })}
      >
        <input {...getInputProps()} />
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
      </Box>
    </>
  )
}

export default DropImport
