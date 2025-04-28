import { useCallback } from 'react'
import useAppSelector from './useAppSelector'

const useTokenizer = () => {
  const tokenizerID = useAppSelector((state) => state.app.tokenizer)

  const encoder = useCallback(
    async (textToEncode: string): Promise<number[]> => {
      switch (tokenizerID) {
        case 'cl100k_base': {
          const { encode: cl100kEncode } = await import(
            'gpt-tokenizer/encoding/cl100k_base'
          )
          return cl100kEncode(textToEncode)
        }
        case 'o200k_base': {
          const { encode: o200kEncode } = await import(
            'gpt-tokenizer/encoding/o200k_base'
          )
          return o200kEncode(textToEncode)
        }
        case 'llama': {
          const llamaTokenizer = (await import('llama-tokenizer-js')).default
          const encoded = llamaTokenizer.encode(textToEncode)
          if (encoded === undefined) {
            return []
          }
          return encoded
        }
        case 'llama3': {
          const llama3Tokenizer = (await import('llama3-tokenizer-js')).default
          return llama3Tokenizer.encode(textToEncode)
        }
        default:
          return []
      }
    },
    [tokenizerID]
  )

  return {
    tokenizerID,
    encoder
  }
}

export default useTokenizer
