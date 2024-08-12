import useTokenizer from '@/hooks/useTokenizer'
import { Avatar, Chip, TextField, TextFieldProps, Tooltip } from '@mui/material'
import { FC, useEffect, useState } from 'react'

export type TextFieldWithTokenCounterProps = TextFieldProps

const TextFieldWithTokenCounter: FC<TextFieldWithTokenCounterProps> = ({ value, label, ...TextFieldProps }) => {
  const [tokenCount, setTokenCount] = useState(0)
  const { encoder, tokenizerID } = useTokenizer()

  useEffect(() => {
    if (value !== undefined && typeof value === 'string') {
      encoder(value)
        .then((tokenCount) => setTokenCount(tokenCount.length))
        .catch(() => setTokenCount(0))
    }
  }, [value, encoder])
  return (
    <TextField
      {...TextFieldProps}
      value={value}
      label={(
        <>
          {label}&nbsp;
          <Tooltip title={`Current tokenizer: ${tokenizerID}. Token counting may not be accurate because it is done without replacing macros and in some cases without considering reserved tokens.`}>
            <Chip avatar={<Avatar>T</Avatar>} color="primary" label={tokenCount} size="medium" />
          </Tooltip>
        </>
      )}
    />
  )
}

export default TextFieldWithTokenCounter
