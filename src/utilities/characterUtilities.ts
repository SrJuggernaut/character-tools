import { getCharacterBook } from '@/services/characterBooks'
import { type CharacterEditorState } from '@/types/character'
import { replaceDateInTemplate } from '@/utilities/date'
import imageToPng from '@/utilities/imageToPng'
import {
  b64DecodeUnicode,
  b64EncodeUnicode
} from '@/utilities/stringConversion'
import { zodErrorToString } from '@/utilities/zod'
import {
  type CharacterBook,
  type V1,
  type V2,
  v1,
  v2
} from 'character-card-utils'
import ExifReader, { type XmpTag } from 'exifreader'
import json5 from 'json5'
import { addMetadataFromBase64DataURI, getMetadata } from 'meta-png'
import { characterEditorToCharacterBook } from '@/utilities/characterBookUtilities'

interface ExtractCharacterDataReturn {
  character: V1 | V2
  image?: string
}

export const extractCharacterData = async (
  file: File
): Promise<ExtractCharacterDataReturn> => {
  switch (file.type) {
    case 'application/json': {
      const text = await file.text()
      const character = JSON.parse(text)
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
      const character = json5.parse(decodedMetadata)
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
        const character = json5.parse(charPreParse)
        return { character, image }
      }
      const character = json5.parse(userComment.description as string)
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
  const character = importedToCharacterEditorState(extracted.character)
  character.tags = [...new Set(character.tags)]
  return {
    ...character,
    image
  }
}

export const importedToCharacterEditorState = (
  data: unknown
): CharacterEditorState => {
  const v2Result = v2.safeParse(data)
  if (v2Result.success) {
    return { ...v2Result.data.data, character_book: undefined }
  }
  const v1Result = v1.safeParse(data)
  if (v1Result.success) {
    return {
      ...v1Result.data,
      alternate_greetings: [],
      creator: '',
      creator_notes: '',
      character_version: '',
      tags: [],
      system_prompt: '',
      post_history_instructions: '',
      extensions: {}
    }
  } else {
    //@ts-expect-error Checking if data is trying to follow the V2 Spec
    if (data.spec === ('chara_card_v2' as V2['spec'])) {
      throw new Error(
        `Imported data is not a valid character, ${zodErrorToString(v2Result.error)}`
      )
    }
    throw new Error(
      `Imported data is not a valid character, ${zodErrorToString(v1Result.error)}`
    )
  }
}

export const characterEditorStateToV1 = (
  characterData: CharacterEditorState
): V1 => {
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
): Promise<V2> => {
  let characterBook: CharacterBook | undefined
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
  characterData: V1 | V2,
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

export const exportCharacterAsJson = (characterData: V1 | V2): string => {
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
