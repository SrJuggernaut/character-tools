import Drop from '@/components/ui/Drop'
import { createCharacterBook } from '@/services/characterBooks'
import { type CharacterBookDatabaseData } from '@/types/lorebook'
import { characterBookToCharacterEditor } from '@/utilities/characterBookUtilities'
import {
  faCheckCircle,
  faFileImport,
  faHourglass,
  faSpinner,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography
} from '@mui/material'
import { type FC, useCallback, useEffect, useState } from 'react'

type ImportedFile =
  | {
      file: File
      status: 'error'
      message: string
    }
  | {
      file: File
      status: 'success'
      data: CharacterBookDatabaseData
    }

const ImportCharacterBook: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [importedFiles, setImportedFiles] = useState<ImportedFile[]>([])
  const [processingFile, setProcessingFile] = useState<File | undefined>(
    undefined
  )

  const processFile = useCallback(async (uploadedFile: File) => {
    const text = await uploadedFile.text()
    const characterBook = JSON.parse(text)
    const editorState = characterBookToCharacterEditor(characterBook)
    const characterCreatedInDB = await createCharacterBook(editorState)
    return characterCreatedInDB
  }, [])

  useEffect(() => {
    if (uploadedFiles.length > 0 && processingFile === undefined) {
      const files = uploadedFiles.slice(1)
      setProcessingFile(uploadedFiles[0])
      setUploadedFiles(files)
    }
  }, [uploadedFiles, processingFile])

  useEffect(() => {
    if (processingFile !== undefined) {
      processFile(processingFile)
        .then((characterCreatedInDB) => {
          setImportedFiles([
            ...importedFiles,
            {
              file: processingFile,
              status: 'success',
              data: characterCreatedInDB
            }
          ])
        })
        .catch((error) => {
          if (error instanceof Error) {
            setImportedFiles([
              ...importedFiles,
              {
                file: processingFile,
                status: 'error',
                message: error.message
              }
            ])
          } else {
            setImportedFiles([
              ...importedFiles,
              {
                file: processingFile,
                status: 'error',
                message: 'Unknown error'
              }
            ])
          }
        })
        .finally(() => {
          setProcessingFile(undefined)
        })
    }
  }, [processingFile])
  return (
    <>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
      >
        Import CharacterBooks
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
              onDropAccepted: (files) => {
                setUploadedFiles(files)
              },
              accept: {
                'image/png': ['.png'],
                'image/webp': ['.webp'],
                'application/json': ['.json']
              },
              multiple: true
            }}
          >
            <FontAwesomeIcon
              icon={faFileImport}
              size="3x"
            />
            <Typography
              variant="subtitle1"
              component="h2"
              align="center"
              gutterBottom
            >
              Upload character files
            </Typography>
            <Typography
              variant="body1"
              component="p"
              align="center"
              gutterBottom
            >
              Drag &amp; drop your character files here, or click to select
              files
            </Typography>
            <Typography
              variant="caption"
              align="center"
              gutterBottom
            >
              Supported file types: .png, .webp, .json
            </Typography>
            <Typography
              variant="caption"
              align="center"
              gutterBottom
            >
              Supported formats: Character Book
            </Typography>
          </Drop>
        </div>
        <div>
          {uploadedFiles.length > 0 ||
          importedFiles.length > 0 ||
          processingFile !== undefined ? (
            <>
              {uploadedFiles.length > 0 && (
                <Typography
                  variant="subtitle1"
                  component="h2"
                  align="center"
                  gutterBottom
                >
                  Processing {uploadedFiles.length} files, do not close this
                  page
                </Typography>
              )}
              <List>
                {importedFiles.length > 0 && (
                  <>
                    <ListSubheader>Processed files</ListSubheader>
                    {importedFiles.map((importedFile, index) => {
                      if (importedFile.status === 'success') {
                        return (
                          <ListItem
                            key={`imported-char-${importedFile.data.id}`}
                            disablePadding
                          >
                            <ListItemIcon
                              sx={{
                                color: 'success.main'
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCheckCircle}
                                size="lg"
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={importedFile.data.name}
                              secondary={`Successfully imported ${importedFile.file.name}`}
                            />
                          </ListItem>
                        )
                      }
                      return (
                        <ListItem
                          key={`imported-char-${index}`}
                          disablePadding
                        >
                          <ListItemIcon
                            sx={{
                              color: 'error.main'
                            }}
                          >
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              size="lg"
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={importedFile.file.name}
                            secondary={`Error importing ${importedFile.file.name}: ${importedFile.message}`}
                          />
                        </ListItem>
                      )
                    })}
                  </>
                )}
                {processingFile !== undefined && (
                  <ListItem
                    key={`imported-char-${processingFile.name}`}
                    disablePadding
                  >
                    <ListItemIcon>
                      <FontAwesomeIcon
                        icon={faSpinner}
                        spin
                        size="lg"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={processingFile.name}
                      secondary="Processing..."
                    />
                  </ListItem>
                )}
                {uploadedFiles.length > 0 && (
                  <>
                    <ListSubheader>Uploaded files</ListSubheader>
                    {uploadedFiles.map((file, index) => (
                      <ListItem
                        key={`uploaded-char-${index}`}
                        disablePadding
                      >
                        <ListItemIcon>
                          <FontAwesomeIcon
                            icon={faHourglass}
                            size="lg"
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={file.name}
                          secondary="Processing..."
                        />
                      </ListItem>
                    ))}
                  </>
                )}
              </List>
            </>
          ) : (
            <></>
          )}
        </div>
      </Box>
    </>
  )
}
export default ImportCharacterBook
