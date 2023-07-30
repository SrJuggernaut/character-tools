import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { updateCharacterEditor } from '@/state/characterEditorSlice'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { type FC } from 'react'
import ImageDrop from '../ImageDrop'

const CharacterData: FC = () => {
  const characterEditorState = useAppSelector((state) => state.characterEditor)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateCharacterEditor({ [event.target.id]: event.target.value }))
  }
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>Character Data</Typography>
      <Typography variant="body1">
      </Typography>
      <TextField
        id="name"
        label="Name"
        value={characterEditorState.name}
        onChange={handleChange}
        error={characterEditorState.name === ''}
        helperText={characterEditorState.name === '' ? 'Name is required' : (<>This is the character name, it will be replaced later on other fields by <code>&#123;&#123;char&#125;&#125;</code></>)}
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
        helperText={characterEditorState.description === '' ? 'Description is required' : 'Description of the character. Would be included by default in every prompt'}
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        minRows={4}
      />
      <TextField
        id="personality"
        label="Personality"
        value={characterEditorState.personality}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField
        id="mes_example"
        label="Message Example"
        value={characterEditorState.mes_example}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        margin='normal'
        multiline
        minRows={4}
      />
      <TextField
        id="scenario"
        label="Scenario"
        value={characterEditorState.scenario}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        margin='normal'
      />
      <TextField
        id="first_mes"
        label="First Message"
        value={characterEditorState.first_mes}
        onChange={handleChange}
        variant='outlined'
        fullWidth
        margin='normal'
        multiline
        minRows={4}
      />
      {characterEditorState.alternate_greetings.length > 0 && characterEditorState.alternate_greetings.map((greeting, index) => (
        <TextField
          key={`alternate_greeting_${index}`}
          id={`alternate_greeting[${index}]`}
          label={`Alternate Greeting ${index + 1}`}
          value={greeting}
          onChange={(event) => {
            const newAlternateGreetings = [...characterEditorState.alternate_greetings]
            newAlternateGreetings[index] = event.target.value
            dispatch(updateCharacterEditor({ alternate_greetings: newAlternateGreetings }))
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size='small'
                  color="error"
                  onClick={() => {
                    const newAlternateGreetings = [...characterEditorState.alternate_greetings]
                    newAlternateGreetings.splice(index, 1)
                    dispatch(updateCharacterEditor({ alternate_greetings: newAlternateGreetings }))
                  }}
                >
                  <FontAwesomeIcon icon={faTrashAlt}size="sm" />
                </IconButton>
              </InputAdornment>
            )
          }}
          variant='outlined'
          fullWidth
          margin='normal'
          multiline
          minRows={4}
        />
      ))}
      <Button
        variant="contained"
        onClick={() => {
          dispatch(updateCharacterEditor({ alternate_greetings: [...characterEditorState.alternate_greetings, 'Hello!'] }))
        }}
        sx={{
          marginY: 2
        }}
      >
        Add Alternate Greeting
      </Button>
      <Typography variant="h3" gutterBottom>Image</Typography>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: theme.spacing(2),
          marginY: theme.spacing(2),
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          }
        })}
      >
        <div>
          <ImageDrop
            onDropedImage={(imageUrl) => {
              dispatch(updateCharacterEditor({ image: imageUrl }))
            }}
          />
        </div>
        <div
          css={{
            dispaly: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            aspectRatio: '2/1'
          }}
        >
          {characterEditorState.image !== undefined && (
            <img
              src={characterEditorState.image}
              alt={`${characterEditorState.name}-image`}
              css={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'

              }}
            />
          )}
        </div>
      </Box>
    </>
  )
}

export default CharacterData
