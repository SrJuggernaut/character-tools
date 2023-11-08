import useAppSelector from '@/hooks/useAppSelector'
import { Chip, TextField, Tooltip, type TextFieldProps } from '@mui/material'
import { encode } from 'gpt-tokenizer/encoding/cl100k_base'
import llamaTokenizer from 'llama-tokenizer-js'
import { useEffect, useState, type FC } from 'react'

export type MultilineTextFieldProps = TextFieldProps

const MultilineTextField: FC<MultilineTextFieldProps> = ({ value, helperText, ...TextFieldProps }) => {
  const [tokenCount, setTokenCount] = useState<number | undefined>(undefined)
  const { tokenizer } = useAppSelector((state) => state.app)

  useEffect(() => {
    if (typeof value !== 'string') return
    if (tokenizer === 'llama') {
      const tokens = llamaTokenizer.encode(value)
      setTokenCount(tokens === undefined ? 0 : tokens.length)
    } else if (tokenizer === 'cl100k_base') {
      setTokenCount(encode(value).length)
    }
  }, [tokenizer, value])

  return (
    <>
      <TextField
        {...TextFieldProps}
        value={value}
        multiline
        minRows={4}
        helperText={
          <>
            {tokenCount !== undefined && (
              <Tooltip title="Token count">
                <Chip label={tokenCount} size="small" color="info"/>
              </Tooltip>
            )}
            &nbsp;
            {helperText}
          </>
        }
      />
    </>
  )
}

export default MultilineTextField
