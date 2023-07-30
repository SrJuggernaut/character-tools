import useAppDispatch from '@/hooks/useAppDispatch'
import { setAlert } from '@/state/feedbackSlice'
import imageToPng from '@/utilities/imageToPng'
import { Box, Button, Typography } from '@mui/material'
import { useCallback, type FC } from 'react'
import { useDropzone } from 'react-dropzone'

export interface ImageDropProps {
  onDropedImage: (imageUrl: string) => void
}

const ImageDrop: FC<ImageDropProps> = ({ onDropedImage }) => {
  const dispatch = useAppDispatch()
  const handleUpdate = async (file: File): Promise<string> => {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target !== null && typeof event.target.result === 'string') {
          const image = imageToPng(event.target.result)
          resolve(image)
        } else {
          reject(new Error('Error while loading image'))
        }
      }

      reader.onerror = (event) => {
        if (event.target !== null && event.target.error instanceof Error) {
          reject(event.target.error)
        } else {
          reject(new Error('Unknown error while loading image'))
        }
      }

      reader.readAsDataURL(file)
    })
  }
  const onDropAccepted = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      handleUpdate(file)
        .then((imageUrl) => {
          onDropedImage(imageUrl)
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
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/gif': ['.gif']
    },
    multiple: false
  })
  return (
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
      <Typography variant="body1" align="center" gutterBottom>
        Drag &amp; drop your image here, or click to select file
      </Typography>
      <Typography variant="caption" align="center" gutterBottom>
        Accepted formats: .png, .jpg, .jpeg, .gif, .webp. Preferred aspect ratio is 1/2
      </Typography>
      <Button variant="contained" color="primary">
        Upload
      </Button>
    </Box>
  )
}

export default ImageDrop
