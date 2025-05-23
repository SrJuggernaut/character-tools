import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Tooltip } from '@mui/material'
import { type FC, type ReactNode, useEffect, useState } from 'react'

export interface CopyButtonProps {
  children?: ReactNode
  textToCopy: string
  tooltip?: ReactNode
}

const CopyButton: FC<CopyButtonProps> = ({ children, textToCopy, tooltip }) => {
  const [copyState, setCopyState] = useState<'idle' | 'success' | 'error'>(
    'idle'
  )
  useEffect(() => {
    if (copyState === 'success' || copyState === 'error') {
      const timer = setTimeout(() => {
        setCopyState('idle')
      }, 500)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [copyState])

  return (
    <Tooltip title={tooltip !== undefined ? tooltip : 'Copy to Clipboard'}>
      <Button
        size="small"
        variant="text"
        color={
          copyState === 'success'
            ? 'success'
            : copyState === 'error'
              ? 'error'
              : undefined
        }
        sx={{ textTransform: 'none' }}
        onClick={() => {
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              setCopyState('success')
            })
            .catch(() => {
              setCopyState('error')
            })
        }}
      >
        {children}
        &nbsp;
        <FontAwesomeIcon
          icon={faCopy}
          size="sm"
        />
      </Button>
    </Tooltip>
  )
}

export default CopyButton
