import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { updateCharacterEditor } from '@/state/characterEditorSlice'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Chip, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { useState, type FC } from 'react'

const CharacterMetadata: FC = () => {
  const characterEditorState = useAppSelector((state) => state.characterEditor)
  const dispatch = useAppDispatch()

  const [addTagValue, setAddTagValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateCharacterEditor({ [event.target.id]: event.target.value }))
  }

  const handleAddTag = (): void => {
    if (addTagValue === '') return
    const newTags = [...characterEditorState.tags]
    newTags.push(addTagValue)
    dispatch(updateCharacterEditor({ tags: newTags }))
    setAddTagValue('')
  }

  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>Character Metadata</Typography>
      <TextField
        id="creator"
        label="Creator"
        value={characterEditorState.creator}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="creator_notes"
        label="Creator Notes"
        value={characterEditorState.creator_notes}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        minRows={4}
      />
      <TextField
        id="character_version"
        label="Character Version"
        value={characterEditorState.character_version}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      {characterEditorState.tags.length > 0 && (
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}
        >
          {characterEditorState.tags.map((tag, index) => (
            <Chip
              key={`tag-${index}`}
              label={tag}
              onDelete={() => {
                const newTags = [...characterEditorState.tags]
                newTags.splice(index, 1)
                dispatch(updateCharacterEditor({ tags: newTags }))
              }}
            />
          ))}
        </div>
      )}
      <TextField
        id="add-tag"
        label="Add Tag"
        value={addTagValue}
        onChange={(event) => { setAddTagValue(event.target.value) }}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            handleAddTag()
          }
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                onClick={handleAddTag}
              >
                <FontAwesomeIcon icon={faPlus} />
              </IconButton>
            </InputAdornment>
          )
        }}
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </>
  )
}

export default CharacterMetadata
