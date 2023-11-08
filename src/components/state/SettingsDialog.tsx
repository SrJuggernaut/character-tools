import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setOpenSettings, setTokenizer } from '@/state/appSlice'
import { type AppState } from '@/types/app'
import { Dialog, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { type FC } from 'react'

const SettingsDialog: FC = () => {
  const { openSettings, tokenizer } = useAppSelector((state) => state.app)
  const dispatch = useAppDispatch()
  return (
    <Dialog
      open={openSettings}
      keepMounted={false}
      fullWidth
      maxWidth='sm'
      onClose={() => {
        dispatch(setOpenSettings(false))
      }}
    >
      <DialogTitle variant='subtitle1'>
        Settings
      </DialogTitle>
      <DialogContent>
        <FormControl
          fullWidth
          margin="normal"
        >
          <InputLabel
            id='tokenizer-label'
          >
            Tokenizer
          </InputLabel>
          <Select
            labelId='tokenizer-label'
            id='tokenizer'
            value={tokenizer}
            label='Tokenizer'
            onChange={(event) => {
              dispatch(setTokenizer(event.target.value as AppState['tokenizer']))
            }}
          >
            <MenuItem value='cl100k_base'>GPT Tokenizer</MenuItem>
            <MenuItem value='llama'>LLAMA Tokenizer</MenuItem>
          </Select>
          <FormHelperText
            id='tokenizer-helper-text'
          >
            Tokenizer used to estimate the number of tokens.
          </FormHelperText>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}
export default SettingsDialog
