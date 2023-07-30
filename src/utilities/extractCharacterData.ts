import { type V1, type V2 } from 'character-card-utils'
import ExifReader, { type XmpTag } from 'exifreader'
import json5 from 'json5'
import { getMetadata } from 'meta-png'
import { b64DecodeUnicode } from './stringConversion'

interface ExtractCharacterDataReturn {
  character: V1 | V2
  image?: string
}

const extractCharacterData = async (file: File): Promise<ExtractCharacterDataReturn> => {
  switch (file.type) {
    case 'application/json':{
      const text = await file.text()
      const character = JSON.parse(text)
      return { character }
    }
    case 'image/png':{
      const arrayBuffer = await file.arrayBuffer()
      const uint8Array = new Uint8Array(arrayBuffer)
      const metadata = getMetadata(uint8Array, 'chara')
      if (metadata === undefined) throw new Error('Invalid character card, Png image does not contain metadata')
      const decodedMetadata = b64DecodeUnicode(metadata)
      const character = json5.parse(decodedMetadata)
      const base64Image = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '')
      const image = `data:image/png;base64,${btoa(base64Image)}`
      return { character, image }
    }
    case 'image/webp':{
      const arrayBuffer = await file.arrayBuffer()
      const exifData = ExifReader.load(arrayBuffer)
      const userComment = exifData?.UserComment?.value as XmpTag[]
      const image = `data:image/webp;base64,${btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))}`
      if (userComment !== undefined && userComment.length === 1 && typeof userComment[0] === 'string') {
        const charPreParse = userComment[0]
        const character = json5.parse(charPreParse)
        return { character, image }
      }
      const character = json5.parse(exifData.UserComment?.description as string)
      return { character, image }
    }
    default:
      throw new Error('Invalid file type')
  }
}

export default extractCharacterData
