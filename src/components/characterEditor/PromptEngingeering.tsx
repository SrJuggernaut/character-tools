import CopyButton from '@/components/CopyButton'
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
      <Typography variant="body1" gutterBottom>
        In this section you can control how you behave creating the prompt you will send. All fields sent in the prompt should accept the <CopyButton textToCopy='{{char}}'>&#123;&#123;char&#125;&#125;</CopyButton>, <CopyButton textToCopy='{{user}}'>&#123;&#123;user&#125;&#125;</CopyButton> and <CopyButton textToCopy='{{original}}'>&#123;&#123;original&#125;&#125;</CopyButton> macros. The <CopyButton textToCopy='{{original}}'>&#123;&#123;original&#125;&#125;</CopyButton> macro will be replaced by its counterpart configured in the tool.
      </Typography>
      <TextField
        id="system_prompt"
        label="System Prompt"
        value={characterEditorState.system_prompt}
        onChange={handleChange}
        helperText="The main prompt used to set the model behavior."
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
        helperText="It is the instruction given to the model after the message history, it is useful to establish the behavior of the model. Commonly known as Jailbreak, it is the part of the prompt closest to the response and can have a particularly high weight."
        fullWidth
        margin="normal"
        multiline
        minRows={4}
      />
    </>
  )
}

export default PromptEngingeering
