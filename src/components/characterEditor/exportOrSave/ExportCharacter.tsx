import ExportCharacterNameTemplate from '@/components/characterEditor/exportOrSave/ExportCharacterNameTemplate'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setAlert } from '@/state/feedbackSlice'
import {
  characterEditorStateToV1,
  characterEditorStateToV2,
  exportCharacterAsJson,
  exportCharacterAsPng,
  getCharacterExportName
} from '@/utilities/characterUtilities'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@mui/material'
import { type FC, useState } from 'react'

const ExportCharacter: FC = () => {
  const dispatch = useAppDispatch()
  const characterEditor = useAppSelector((theme) => theme.characterEditor)
  const characterCardExportNameTemplate = useAppSelector(
    (theme) => theme.app.characterCardExportNameTemplate
  )
  const [openEditExportCharacterName, setOpenEditExportCharacterName] =
    useState(false)

  const handleDownload = (url: string, filename: string): void => {
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
  }

  return (
    <>
      <Button
        type="button"
        variant="contained"
        color="success"
        onClick={() => {
          setOpenEditExportCharacterName(true)
        }}
      >
        Edit Export Name Template
      </Button>
      <Dialog
        open={openEditExportCharacterName}
        keepMounted={false}
        fullWidth
        maxWidth="sm"
        onClose={() => {
          setOpenEditExportCharacterName(false)
        }}
      >
        <DialogTitle variant="subtitle1">Edit Export Name Template</DialogTitle>
        <DialogContent>
          <ExportCharacterNameTemplate />
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="success"
            onClick={() => {
              setOpenEditExportCharacterName(false)
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          const v1Character = characterEditorStateToV1(characterEditor)
          const JSONUrl = exportCharacterAsJson(v1Character)
          const exportName = getCharacterExportName(
            characterCardExportNameTemplate,
            {
              name: characterEditor.name,
              spec: 'V1',
              id: characterEditor.id,
              creator: characterEditor.creator,
              version: characterEditor.character_version
            }
          )
          handleDownload(JSONUrl, `${exportName}.json`)
        }}
      >
        Export as JSON V1
      </Button>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          characterEditorStateToV2(characterEditor)
            .then((v2Character) => {
              const JSONUrl = exportCharacterAsJson(v2Character)
              const exportName = getCharacterExportName(
                characterCardExportNameTemplate,
                {
                  name: characterEditor.name,
                  spec: 'V2',
                  id: characterEditor.id,
                  creator: characterEditor.creator,
                  version: characterEditor.character_version
                }
              )
              handleDownload(JSONUrl, `${exportName}.json`)
            })
            .catch((error) => {
              if (error instanceof Error) {
                dispatch(
                  setAlert({
                    title: 'Error while exporting character',
                    message: error.message,
                    severity: 'error'
                  })
                )
              } else {
                dispatch(
                  setAlert({
                    title: 'Error while exporting character',
                    message:
                      'An unknown error occurred while exporting the character',
                    severity: 'error'
                  })
                )
              }
            })
        }}
      >
        Export as JSON V2
      </Button>
      {characterEditor.image !== undefined && (
        <>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              const v1Character = characterEditorStateToV1(characterEditor)
              const PNGUrl = exportCharacterAsPng(
                v1Character,
                characterEditor.image as string
              )
              const exportName = getCharacterExportName(
                characterCardExportNameTemplate,
                {
                  name: characterEditor.name,
                  spec: 'V1',
                  id: characterEditor.id,
                  creator: characterEditor.creator,
                  version: characterEditor.character_version
                }
              )
              handleDownload(PNGUrl, `${exportName}.png`)
            }}
          >
            Export as PNG V1
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              characterEditorStateToV2(characterEditor)
                .then((v2Character) => {
                  const PNGUrl = exportCharacterAsPng(
                    v2Character,
                    characterEditor.image as string
                  )
                  const exportName = getCharacterExportName(
                    characterCardExportNameTemplate,
                    {
                      name: characterEditor.name,
                      spec: 'V2',
                      id: characterEditor.id,
                      creator: characterEditor.creator,
                      version: characterEditor.character_version
                    }
                  )
                  handleDownload(PNGUrl, `${exportName}.png`)
                })
                .catch((error) => {
                  if (error instanceof Error) {
                    dispatch(
                      setAlert({
                        title: 'Error while exporting character',
                        message: error.message,
                        severity: 'error'
                      })
                    )
                  } else {
                    dispatch(
                      setAlert({
                        title: 'Error while exporting character',
                        message:
                          'An unknown error occurred while exporting the character',
                        severity: 'error'
                      })
                    )
                  }
                })
            }}
          >
            Export as PNG V2
          </Button>
        </>
      )}
    </>
  )
}
export default ExportCharacter
