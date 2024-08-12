import CopyButton from '@/components/CopyButton'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setCharacterCardExportNameTemplate, setOpenSettings, setTokenizer } from '@/state/appSlice'
import { type AppState } from '@/types/app'
import { Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { type FC } from 'react'

const SettingsDialog: FC = () => {
  const { openSettings, tokenizer, characterCardExportNameTemplate } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  return (
    <Dialog
      open={openSettings}
      keepMounted={false}
      fullWidth
      maxWidth="sm"
      onClose={() => {
        dispatch(setOpenSettings(false))
      }}
    >
      <DialogTitle variant="subtitle1">
        Settings
      </DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2">
          Tokenizer
        </Typography>
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel
            id="tokenizer-label"
          >
            Tokenizer
          </InputLabel>
          <Select
            labelId="tokenizer-label"
            id="tokenizer"
            value={tokenizer}
            label="Tokenizer"
            onChange={(event) => {
              dispatch(setTokenizer(event.target.value as AppState['tokenizer']))
            }}
          >
            <MenuItem value="cl100k_base">GPT-3, GPT-3.5, GPT-4</MenuItem>
            <MenuItem value="o200k_base">GPT-4o</MenuItem>
            <MenuItem value="llama">LLAMA Tokenizer</MenuItem>
            <MenuItem value="llama3">LLAMA3 Tokenizer</MenuItem>
          </Select>
          <FormHelperText
            id="tokenizer-helper-text"
          >
            Tokenizer used to estimate the number of tokens.
          </FormHelperText>
        </FormControl>
        <Typography variant="subtitle2">
          Character Card Export Name Template
        </Typography>
        <Typography variant="body2">
          The template used to name exported character cards. The following variables are available:
        </Typography>
        <CopyButton
          textToCopy="{{name}}"
        >
          {'{{name}}'}
        </CopyButton>
        <CopyButton
          textToCopy="{{id}}"
        >
          {'{{id}}'}
        </CopyButton>
        <CopyButton
          textToCopy="{{version}}"
        >
          {'{{version}}'}
        </CopyButton>
        <CopyButton
          textToCopy="{{creator}}"
        >
          {'{{creator}}'}
        </CopyButton>
        <CopyButton
          textToCopy="{{date}}"
        >
          {'{{date [formatString]}}'}
        </CopyButton>
        <CopyButton
          textToCopy="{{spec}}"
        >
          {'{{spec}}'}
        </CopyButton>
        <Typography variant="caption" component="div">
          The format string is optional and defaults to YYYY-MM-DD. See <a href="https://date-fns.org/v2.16.1/docs/format">date-fns</a> for more information.
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
        />
      </DialogContent>
    </Dialog>
  )
}
export default SettingsDialog
