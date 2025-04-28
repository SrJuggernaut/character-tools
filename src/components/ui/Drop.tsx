import { Box } from '@mui/material'
import { type FC, type ReactNode } from 'react'
import { type DropzoneOptions, useDropzone } from 'react-dropzone'

export interface DropProps {
  children?: ReactNode
  dropzoneOptions?: DropzoneOptions
}

const Drop: FC<DropProps> = ({ dropzoneOptions, children }) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive
  } = useDropzone(dropzoneOptions)

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
      {children}
    </Box>
  )
}
export default Drop
