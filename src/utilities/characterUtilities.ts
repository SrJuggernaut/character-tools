import { getCharacterBook } from '@/services/characterBooks'
import { type CharacterEditorState } from '@/types/character'
import { replaceDateInTemplate } from '@/utilities/date'
import imageToPng from '@/utilities/imageToPng'
import {
  b64DecodeUnicode,
  b64EncodeUnicode
} from '@/utilities/stringConversion'
import { CharacterCard, SpecV1, SpecV2 } from '@lenml/char-card-reader'
import ExifReader, { type XmpTag } from 'exifreader'
import json5 from 'json5'
import { addMetadataFromBase64DataURI, getMetadata } from 'meta-png'
import { characterEditorToCharacterBook } from '@/utilities/characterBookUtilities'

interface ExtractCharacterDataReturn {
  character: CharacterCard
  image?: string
}

export const extractCharacterData = async (
  file: File
): Promise<ExtractCharacterDataReturn> => {
  switch (file.type) {
    case 'application/json': {
      const text = await file.text()
      const jsonData = JSON.parse(text)
      const character = CharacterCard.from_json(jsonData)
      return { character }
    }
    case 'image/png': {
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      const metadata = getMetadata(uint8Array, 'chara')
      if (metadata === undefined)
        throw new Error(
          'Invalid character card, Png image does not contain metadata'
        )
      const decodedMetadata = b64DecodeUnicode(metadata)
      const jsonData = json5.parse(decodedMetadata)
      const character = CharacterCard.from_json(jsonData)
      const base64Image = uint8Array.reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
      const image = `data:image/png;base64,${btoa(base64Image)}`
      return { character, image }
    }
    case 'image/webp': {
      const arrayBuffer = await file.arrayBuffer()
      const exifData = ExifReader.load(arrayBuffer)
      if (
        exifData === undefined ||
        exifData.UserComment === undefined ||
        exifData.UserComment === null
      )
        throw new Error(
          'Invalid character card, Webp image does not contain metadata'
        )
      const userComment = exifData.UserComment as XmpTag
      const userCommentValue = userComment.value as XmpTag[]
      const image = `data:image/webp;base64,${btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))}`
      if (
        userCommentValue !== undefined &&
        userCommentValue.length === 1 &&
        typeof userCommentValue[0] === 'string'
      ) {
        const charPreParse = userCommentValue[0]
        const jsonData = json5.parse(charPreParse)
        const character = CharacterCard.from_json(jsonData)
        return { character, image }
      }
      const jsonData = json5.parse(userComment.description as string)
      const character = CharacterCard.from_json(jsonData)
      return { character, image }
    }
    default:
      throw new Error('Invalid file type')
  }
}

export const FileToCharacterEditorState = async (
  file: File
): Promise<CharacterEditorState> => {
  const extracted = await extractCharacterData(file)
  
  const image =
    extracted.image !== undefined
      ? await imageToPng(extracted.image)
      : undefined

  const data = {character: extracted.character, image}

  return importedToCharacterEditorState(data)
}

export const importedToCharacterEditorState = (
  data: ExtractCharacterDataReturn
): CharacterEditorState => {
  const v2 = data.character.toSpecV2()
  const c = v2.data
  return {
    name: c.name,
    description: c.description,
    personality: c.personality,
    mes_example: c.mes_example,
    scenario: c.scenario,
    first_mes: c.first_mes,
    alternate_greetings: c.alternate_greetings ?? [],
    creator: c.creator,
    creator_notes: c.creator_notes,
    character_version: c.character_version,
    tags: c.tags,
    system_prompt: c.system_prompt,
    post_history_instructions: c.post_history_instructions,
    character_book: undefined,
    extensions: c.extensions,
    image: data.image
  }
}

export const characterEditorStateToV1 = (
  characterData: CharacterEditorState
): SpecV1.TavernCard => {
  return {
    name: characterData.name,
    description: characterData.description,
    first_mes: characterData.first_mes,
    mes_example: characterData.mes_example,
    personality: characterData.personality,
    scenario: characterData.scenario
  }
}

export const characterEditorStateToV2 = async (
  characterData: CharacterEditorState
): Promise<SpecV2.TavernCardV2> => {
  let characterBook: SpecV2.CharacterBook | undefined
  if (characterData.character_book !== undefined) {
    const characterBookEditor = await getCharacterBook(
      characterData.character_book
    )
    if (characterBookEditor === undefined)
      throw new Error(
        `CharacterBook with id ${characterData.character_book} does not exist, maybe it was deleted?`
      )
    characterBook = characterEditorToCharacterBook(characterBookEditor)
  }
  return {
    spec: 'chara_card_v2',
    spec_version: '2.0',
    data: {
      name: characterData.name,
      description: characterData.description,
      first_mes: characterData.first_mes,
      alternate_greetings: characterData.alternate_greetings,
      mes_example: characterData.mes_example,
      character_version: characterData.character_version,
      creator: characterData.creator,
      creator_notes: characterData.creator_notes,
      personality: characterData.personality,
      extensions: characterData.extensions,
      post_history_instructions: characterData.post_history_instructions,
      scenario: characterData.scenario,
      system_prompt: characterData.system_prompt,
      tags: characterData.tags,
      character_book: characterBook
    }
  }
}

export const exportCharacterAsPng = (
  characterData: SpecV1.TavernCard | SpecV2.TavernCardV2,
  image: string
): string => {
  const stringifiedCharacterData = JSON.stringify(characterData)
  const dataOnBase64 = b64EncodeUnicode(stringifiedCharacterData)
  const imageToExportAsUrlData = addMetadataFromBase64DataURI(
    image,
    'chara',
    dataOnBase64
  )
  return imageToExportAsUrlData
}

export const exportCharacterAsJson = (characterData: SpecV1.TavernCard | SpecV2.TavernCardV2): string => {
  const json = JSON.stringify(characterData)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  return url
}

export interface CharacterData {
  name: string
  spec: 'V1' | 'V2'
  version?: string
  id?: string
  creator?: string
}

export const getCharacterExportName = (
  template: string,
  characterData: CharacterData
): string => {
  template = template.replace('{{name}}', characterData.name)
  template = template.replace('{{spec}}', characterData.spec)
  template = template.replace('{{version}}', characterData.version ?? '')
  template = template.replace('{{id}}', characterData.id ?? '')
  template = template.replace('{{creator}}', characterData.creator ?? '')
  return replaceDateInTemplate(template)
}
