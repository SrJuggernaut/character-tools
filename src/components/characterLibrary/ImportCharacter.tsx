import Drop from '@/components/ui/Drop'
import { createCharacter } from '@/services/character'
import { createCharacterBook } from '@/services/characterBooks'
import { type CharacterDatabaseData } from '@/types/character'
import { type CharacterBookDatabaseData } from '@/types/lorebook'
import { characterBookToCharacterEditor, extractCharacterBookFromCharacter } from '@/utilities/characterBookUtilities'
import { extractCharacterData, importedToCharacterEditorState } from '@/utilities/characterUtilities'
import imageToPng from '@/utilities/imageToPng'
import { faCheckCircle, faFileImport, faHourglass, faSpinner, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from '@mui/material'
import { useEffect, useState, type FC } from 'react'

type ImportedFile = {
  file: File
  status: 'error'
  message: string
} | {
  file: File
  status: 'success'
  data: CharacterDatabaseData
  characterBook?: CharacterBookDatabaseData
}
const ImportCharacter: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [importedFiles, setImportedFiles] = useState<ImportedFile[]>([])
  const [processingFile, setProcessingFile] = useState<File | undefined>(undefined)

  useEffect(() => {
    if (uploadedFiles.length > 0 && processingFile === undefined) {
      const files = uploadedFiles.slice(1)
      setProcessingFile(uploadedFiles[0])
      setUploadedFiles(files)
    }
  }, [uploadedFiles, processingFile])

  useEffect(() => {
    if (processingFile !== undefined) {
      extractCharacterData(processingFile)
        .then(async (extracted) => {
          const image = extracted.image !== undefined ? await imageToPng(extracted.image) : undefined
          const characterEditorState = importedToCharacterEditorState(extracted.character)
          const characterBook = extractCharacterBookFromCharacter(extracted.character)
          let savedCharacterBook: CharacterBookDatabaseData | undefined
          if (characterBook !== undefined) {
            const characterBookEditor = characterBookToCharacterEditor(characterBook)
            savedCharacterBook = await createCharacterBook(characterBookEditor)
          }
          const createdCharacter = await createCharacter({ ...characterEditorState, image })
          setImportedFiles([
            ...importedFiles,
            {
              file: processingFile,
              status: 'success',
              data: createdCharacter,
              characterBook: savedCharacterBook
            }
          ])
          setProcessingFile(undefined)
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
          setProcessingFile(undefined)
        })
    }
  }, [processingFile])

  return (
    <>
      <Typography variant="h1" align="center" gutterBottom>Import Characters</Typography>
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
            <FontAwesomeIcon icon={faFileImport} size='3x' />
            <Typography variant="subtitle1" component="h2" align="center" gutterBottom>
              Upload character files
            </Typography>
            <Typography variant="body1" component="p" align="center" gutterBottom>
              Drag &amp; drop your character files here, or click to select files
            </Typography>
            <Typography variant="caption" align="center" gutterBottom>
              Supported file types: .png, .webp, .json
            </Typography>
          </Drop>
        </div>
        <div>
          {uploadedFiles.length > 0 || importedFiles.length > 0 || processingFile !== undefined
            ? (
              <>
                {uploadedFiles.length > 0 && (
                  <Typography variant="subtitle1" component="h2" align="center" gutterBottom>
                    Processing {uploadedFiles.length} files, do not close this page
                  </Typography>
                )}
                <List>
                  {importedFiles.length > 0 && (
                    <>
                      <ListSubheader>
                        Processed files
                      </ListSubheader>
                      {importedFiles.map((importedFile, index) => {
                        if (importedFile.status === 'success') {
                          return (
                            <ListItem key={`imported-char-${importedFile.data.id}`} disablePadding>
                              <ListItemIcon
                                sx={{
                                  color: 'success.main'
                                }}
                              >
                                <FontAwesomeIcon icon={faCheckCircle} size='lg' />
                              </ListItemIcon>
                              <ListItemText primary={importedFile.data.name} secondary={`Successfully imported ${importedFile.file.name}${importedFile.characterBook !== undefined ? ` with characterBook named ${importedFile.characterBook.name}` : ''}`} />
                            </ListItem>
                          )
                        }
                        return (
                          <ListItem key={`imported-char-${index}`} disablePadding>
                            <ListItemIcon
                              sx={{
                                color: 'error.main'
                              }}
                            >
                              <FontAwesomeIcon icon={faTimesCircle} size='lg' />
                            </ListItemIcon>
                            <ListItemText primary={importedFile.file.name} secondary={`Error importing ${importedFile.file.name}: ${importedFile.message}`} />
                          </ListItem>
                        )
                      })}
                    </>
                  )}
                  {processingFile !== undefined && (
                    <ListItem key={`imported-char-${processingFile.name}`} disablePadding>
                      <ListItemIcon>
                        <FontAwesomeIcon icon={faSpinner} spin size='lg' />
                      </ListItemIcon>
                      <ListItemText primary={processingFile.name} secondary='Processing...' />
                    </ListItem>
                  )}
                  {uploadedFiles.length > 0 && (
                    <>
                      <ListSubheader>
                        Uploaded files
                      </ListSubheader>
                      {uploadedFiles.map((file, index) => (
                        <ListItem key={`uploaded-char-${index}`} disablePadding>
                          <ListItemIcon>
                            <FontAwesomeIcon icon={faHourglass} size='lg' />
                          </ListItemIcon>
                          <ListItemText primary={file.name} secondary='Processing...' />
                        </ListItem>
                      ))}
                    </>
                  )}
                </List>
              </>
            )
            : (<></>)
          }
        </div>
      </Box>
    </>
  )
}
export default ImportCharacter
