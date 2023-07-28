import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { updateCharacterEditor } from '@/state/characterEditorSlice'
import { TextField, Typography } from '@mui/material'
import { type FC } from 'react'

const PromptEngingeering: FC = () => {
  const characterEditorState = useAppSelector((state) => state.characterEditor)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateCharacterEditor({ [event.target.id]: event.target.value }))
  }

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>Prompt Engineering</Typography>
      <TextField
        id="system_prompt"
        label="System Prompt"
        value={characterEditorState.system_prompt}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        minRows={4}
      />
      <TextField
        id="post_history_instructions"
        label="Post History Instructions"
        value={characterEditorState.post_history_instructions}
        onChange={handleChange}
        fullWidth
        margin="normal"
        multiline
        minRows={4}
      />
    </>
  )
}

export default PromptEngingeering
