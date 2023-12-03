import CopyButton from '@/components/CopyButton'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setCharacterCardExportNameTemplate } from '@/state/appSlice'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Link, TextField, Tooltip, Typography } from '@mui/material'
import { type FC } from 'react'

const ExportCharacterNameTemplate: FC = () => {
  const { characterCardExportNameTemplate } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  return (
    <>
      <Typography variant='body2'>
        The template used to name exported character cards. The following variables are available:
      </Typography>
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <CopyButton
          textToCopy='{{name}}'
        >
          {'{{name}}'}
        </CopyButton>
        <CopyButton
          textToCopy='{{id}}'
          tooltip='if the character has no id, this will be empty string'
        >
          {'{{id}}'}
        </CopyButton>
        <CopyButton
          textToCopy='{{version}}'
          tooltip='if the character has no version, this will be empty string'
        >
          {'{{version}}'}
        </CopyButton>
        <CopyButton
          textToCopy='{{creator}}'
          tooltip='if the character has no creator, this will be empty string'
        >
          {'{{creator}}'}
        </CopyButton>
        <CopyButton
          textToCopy='{{date}}'
          tooltip='{{date}} is equivalent to {{date yyyy-MM-dd-HH-mm}}'
        >
          {'{{date [formatString]}}'}
        </CopyButton>
        <CopyButton
          textToCopy='{{spec}}'
        >
          {'{{spec}}'}
        </CopyButton>
      </div>
      <Typography variant='caption' component='div'>
        The format string is optional and defaults to yyyy-MM-dd-HH-mm. See <Link target="_blank" rel="noopener noreferrer" href='https://date-fns.org/docs/format'>date-fns format documentation</Link> for more information.
      </Typography>
      <TextField
        id="character-card-export-name-template"
        label="Character Card Export Name Template"
        fullWidth
        margin="normal"
        value={characterCardExportNameTemplate}
        onChange={(event) => {
          dispatch(setCharacterCardExportNameTemplate(event.target.value))
        }}
        InputProps={{
          endAdornment: (
            <>
              <Tooltip title='Reset to Default'>
                <IconButton
                  onClick={() => {
                    dispatch(setCharacterCardExportNameTemplate('{{name}}-spec{{spec}}'))
                  }}
                >
                  <FontAwesomeIcon icon={faUndo} size="sm" />
                </IconButton>
              </Tooltip>
            </>
          )
        }}
      />
    </>
  )
}
export default ExportCharacterNameTemplate
