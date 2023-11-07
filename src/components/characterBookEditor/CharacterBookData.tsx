import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { updateCharacterBookEditor } from '@/state/characterBookEditorSlice'
import { Checkbox, FormControlLabel, FormGroup, FormHelperText, TextField, Typography } from '@mui/material'
import { type FC } from 'react'
import NumberField from '../ui/form/NumberField'

const CharacterBookData: FC = () => {
  const characterEditorState = useAppSelector((state) => state.characterBookEditor)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateCharacterBookEditor({ [event.target.id]: event.target.value }))
  }
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>CharacterBook Data</Typography>
      <TextField
        id="name"
        label="Name"
        value={characterEditorState.name}
        onChange={handleChange}
        error={characterEditorState.name === ''}
        helperText={characterEditorState.name === '' ? 'Name is required' : 'The name of your CharacterBook. This will be used to identify your CharacterBook in the CharacterBook list.'}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="description"
        label="Description"
        value={characterEditorState.description}
        onChange={handleChange}
        error={characterEditorState.description === ''}
        helperText={characterEditorState.description === '' ? 'Description is required' : 'A description of your CharacterBook.'}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        minRows={4}
      />
      <NumberField
        id="scan_depth"
        label="Scan Depth"
        value={characterEditorState.scan_depth}
        onChange={(_, value) => {
          dispatch(updateCharacterBookEditor({ scan_depth: value }))
        }}
        error={characterEditorState.scan_depth === undefined}
        helperText={characterEditorState.scan_depth === undefined ? 'Scan Depth is required' : 'The number of messages to scan for keywords.'}
        fullWidth
        margin="normal"
      />
      <NumberField
        id="token_budget"
        label="Token Budget"
        value={characterEditorState.token_budget}
        onChange={(_, value) => {
          dispatch(updateCharacterBookEditor({ token_budget: value }))
        }}
        error={characterEditorState.token_budget === undefined}
        helperText={characterEditorState.token_budget === undefined ? 'Token Budget is required' : 'The number of tokens to spend with data from the CharacterBook.'}
        fullWidth
        margin="normal"
      />
      <FormGroup>
        <FormControlLabel
          control={(
            <Checkbox
              id="recursive_scan"
              checked={characterEditorState.recursive_scanning}
              onChange={(_, value) => {
                dispatch(updateCharacterBookEditor({ recursive_scanning: value }))
              }}
            />
          )}
          label="Recursive Scan"
        />
        <FormHelperText>
          When enabled, the data from the CharacterBook will be used to scan for keywords in the CharacterBook.
        </FormHelperText>
      </FormGroup>
    </>
  )
}
export default CharacterBookData
