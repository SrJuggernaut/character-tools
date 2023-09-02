import useAppSelector from '@/hooks/useAppSelector'
import { characterEditorStateToV1, characterEditorStateToV2, exportCharacterAsJson, exportCharacterAsPng } from '@/utilities/characterUtilities'
import { Button } from '@mui/material'
import { type FC } from 'react'

const ExportCharacter: FC = () => {
  const characterEditor = useAppSelector((theme) => theme.characterEditor)
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
        onClick={() => {
          const v1Character = characterEditorStateToV1(characterEditor)
          const JSONUrl = exportCharacterAsJson(v1Character)
          handleDownload(JSONUrl, `${characterEditor.name}-specV1.json`)
        }}
      >
        Export as JSON V1
      </Button>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          const v2Character = characterEditorStateToV2(characterEditor)
          const JSONUrl = exportCharacterAsJson(v2Character)
          handleDownload(JSONUrl, `${characterEditor.name}-specV2.json`)
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
              const PNGUrl = exportCharacterAsPng(v1Character, characterEditor.image as string)
              handleDownload(PNGUrl, `${characterEditor.name}-specV1.png`)
            }}
          >
            Export as PNG V1
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              const v2Character = characterEditorStateToV2(characterEditor)
              const PNGUrl = exportCharacterAsPng(v2Character, characterEditor.image as string)
              handleDownload(PNGUrl, `${characterEditor.name}-specV2.png`)
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