import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setCharacterBookExportNameTemplate } from '@/state/appSlice'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton, Link, TextField, Tooltip, Typography } from '@mui/material'
import { type FC } from 'react'
import CopyButton from '../CopyButton'

const ExportCharacterBookNameTemplate: FC = () => {
  const characterBookExportNameTemplate = useAppSelector((state) => state.app.characterBookExportNameTemplate)
  const dispatch = useAppDispatch()

  return (
    <>
      <Typography variant='body2'>
        The template used to name exported Character Book. The following variables are available:
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
          textToCopy='{{date}}'
          tooltip='{{date}} is equivalent to {{date yyyy-MM-dd-HH-mm}}'
        >
          {'{{date [formatString]}}'}
        </CopyButton>
        <Typography variant='caption' component='div'>
          The format string is optional and defaults to yyyy-MM-dd-HH-mm. See <Link target="_blank" rel="noopener noreferrer" href='https://date-fns.org/docs/format'>date-fns format documentation</Link> for more information.
        </Typography>
        <TextField
          id="character-card-export-name-template"
          label="Character Card Export Name Template"
          fullWidth
          margin="normal"
          value={characterBookExportNameTemplate}
          onChange={(event) => {
            dispatch(setCharacterBookExportNameTemplate(event.target.value))
          }}
          InputProps={{
            endAdornment: (
              <>
                <Tooltip title='Reset to Default'>
                  <IconButton
                    onClick={() => {
                      dispatch(setCharacterBookExportNameTemplate('{{name}}-characterBook'))
                    }}
                  >
                    <FontAwesomeIcon icon={faUndo} size="sm" />
                  </IconButton>
                </Tooltip>
              </>
            )
          }}
        />
      </div>
    </>
  )
}
export default ExportCharacterBookNameTemplate
