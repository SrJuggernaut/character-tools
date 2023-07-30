import { type CharacterEditorState } from '@/types/character'
import { v1, v2, type V1, type V2 } from 'character-card-utils'
import { addMetadataFromBase64DataURI } from 'meta-png'
import { b64EncodeUnicode } from './stringConversion'

export const importedToCharacterEditorState = (data: any): CharacterEditorState => {
  const v1Result = v1.safeParse(data)
  const v2Result = v2.safeParse(data)
  if (v1Result.success) {
    return { ...v1Result.data, alternate_greetings: [], creator: '', creator_notes: '', character_version: '', tags: [], system_prompt: '', post_history_instructions: '', extensions: {} }
  } else if (v2Result.success) {
    return { ...v2Result.data.data }
  } else {
    throw new Error('Imported data is not a valid character')
  }
}

export const characterEditorStateToV1 = (characterData: CharacterEditorState): V1 => {
  return {
    name: characterData.name,
    description: characterData.description,
    first_mes: characterData.first_mes,
    mes_example: characterData.mes_example,
    personality: characterData.personality,
    scenario: characterData.scenario
  }
}

export const characterEditorStateToV2 = (characterData: CharacterEditorState): V2 => {
  const { id, image, ...rest } = characterData
  return {
    spec: 'chara_card_v2',
    spec_version: '2.0',
    data: rest
  }
}

export const exportCharacterAsPng = (characterData: V1 | V2, image: string): string => {
  const stringifiedCharacterData = JSON.stringify(characterData)
  const dataOnBase64 = b64EncodeUnicode(stringifiedCharacterData)
  const imageToExportAsUrlData = addMetadataFromBase64DataURI(image, 'chara', dataOnBase64)
  return imageToExportAsUrlData
}

export const exportCharacterAsJson = (characterData: V1 | V2): string => {
  const json = JSON.stringify(characterData)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  return url
}
