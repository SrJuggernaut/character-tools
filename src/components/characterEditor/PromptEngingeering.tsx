import ToolbarDial from '@/components/characterEditor/ToolbarDial'
import CopyButton from '@/components/CopyButton'
import TextFieldWithTokenCounter from '@/components/ui/form/TextFieldWithTokenCounter'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { dataBase } from '@/lib/dexie'
import { updateCharacterEditor } from '@/state/characterEditorSlice'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Autocomplete, TextField, Typography } from '@mui/material'
import { useLiveQuery } from 'dexie-react-hooks'
import { type FC } from 'react'

const PromptEngingeering: FC = () => {
  const characterBooks = useLiveQuery(async () => {
    const characterBooks = await dataBase.characterBooks.toArray()
    return characterBooks.map((characterBook) => ({ label: characterBook.name, value: characterBook.id }))
  })
  const characterEditorState = useAppSelector((state) => state.characterEditor)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateCharacterEditor({ [event.target.id]: event.target.value }))
  }

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>Prompt Engineering</Typography>
      <Typography variant="body1" gutterBottom>
        In this section you can control how you behave creating the prompt you will send. All fields sent in the prompt should accept the <CopyButton textToCopy="{{char}}">&#123;&#123;char&#125;&#125;</CopyButton>, <CopyButton textToCopy="{{user}}">&#123;&#123;user&#125;&#125;</CopyButton> and <CopyButton textToCopy="{{original}}">&#123;&#123;original&#125;&#125;</CopyButton> macros. The <CopyButton textToCopy="{{original}}">&#123;&#123;original&#125;&#125;</CopyButton> macro will be replaced by its counterpart configured in the tool.
      </Typography>
      <TextFieldWithTokenCounter
        id="system_prompt"
        label="System Prompt"
        value={characterEditorState.system_prompt}
        onChange={handleChange}
        helperText="The main prompt used to set the model behavior."
        multiline
        minRows={3}
        fullWidth
        margin="normal"
      />
      <TextFieldWithTokenCounter
        id="post_history_instructions"
        label="Post History Instructions"
        value={characterEditorState.post_history_instructions}
        onChange={handleChange}
        helperText="It is the instruction given to the model after the message history, it is useful to establish the behavior of the model. Commonly known as Jailbreak, it is the part of the prompt closest to the response and can have a particularly high weight."
        multiline
        minRows={3}
        fullWidth
        margin="normal"
      />
      {
        characterBooks === undefined
          ? <Typography variant="body1" gutterBottom>Loading character books...</Typography>
          : (
              <Autocomplete
                value={
                  characterEditorState.character_book === undefined
                    ? null
                    : characterBooks?.find((characterBook) => characterBook.value === characterEditorState.character_book) !== undefined
                      ? characterBooks?.find((characterBook) => characterBook.value === characterEditorState.character_book)
                      : { label: 'Not Found', value: characterEditorState.character_book }
                }
                onChange={(_, value) => {
                  if (value !== null) {
                    dispatch(updateCharacterEditor({ character_book: value.value }))
                  } else {
                    dispatch(updateCharacterEditor({ character_book: undefined }))
                  }
                }}
                options={characterBooks ?? []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={
                      characterEditorState.character_book !== undefined && characterBooks?.find((characterBook) => characterBook.value === characterEditorState.character_book) === undefined
                    }
                    helperText={
                      characterEditorState.character_book !== undefined && characterBooks?.find((characterBook) => characterBook.value === characterEditorState.character_book) === undefined
                        ? `Character Book with id ${characterEditorState.character_book} not found, please select a valid Character Book. Or to leave it empty, delete the value.`
                        : undefined
                    }
                    label="Character Book"
                    margin="normal"
                    fullWidth
                  />
                )}
                clearIcon={(
                  <FontAwesomeIcon icon={faTimes} size="xs" fixedWidth />
                )}
              />
            )
      }
      <ToolbarDial />
    </>
  )
}

export default PromptEngingeering
