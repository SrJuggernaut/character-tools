import CopyButton from '@/components/CopyButton'
import ImageDrop from '@/components/ImageDrop'
import ToolbarDial from '@/components/characterEditor/ToolbarDial'
import TextFieldWithTokenCounter from '@/components/ui/form/TextFieldWithTokenCounter'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { updateCharacterEditor } from '@/state/characterEditorSlice'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography
} from '@mui/material'
import { type FC } from 'react'

const CharacterData: FC = () => {
  const characterEditorState = useAppSelector((state) => state.characterEditor)
  const dispatch = useAppDispatch()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(updateCharacterEditor({ [event.target.id]: event.target.value }))
  }
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
      >
        Character Data
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        General data about your character. All fields sent at the prompt should
        accept the macros{' '}
        <CopyButton textToCopy="{{char}}">
          &#123;&#123;char&#125;&#125;
        </CopyButton>{' '}
        and{' '}
        <CopyButton textToCopy="{{user}}">
          &#123;&#123;user&#125;&#125;
        </CopyButton>{' '}
        which will be replaced by the character and user name respectively, this
        is very useful to quickly change the character name without having to
        edit all the content. Specific tools such as{' '}
        <Link
          href="https://docs.sillytavern.app/usage/core-concepts/characterdesign/#replacement-tags-macros"
          target="_blank"
          rel="noreferrer"
        >
          Silly Tavern have their own list of macros
        </Link>{' '}
        that can be used and it is advisable to take them into account if you
        use such tools.
      </Typography>
      <TextField
        id="name"
        label="Name"
        value={characterEditorState.name}
        onChange={handleChange}
        error={characterEditorState.name === ''}
        helperText={
          characterEditorState.name === ''
            ? 'Name is required'
            : 'The name of your character, this is the only field where you should not use the {{char}} macro.'
        }
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextFieldWithTokenCounter
        id="description"
        label="Description"
        value={characterEditorState.description}
        onChange={handleChange}
        error={characterEditorState.description === ''}
        helperText={
          characterEditorState.description === ''
            ? 'Description is required'
            : 'Used to add the character description and the rest that the AI should know. This will always be present in the prompt, so all the important facts should be included here.'
        }
        variant="outlined"
        multiline
        minRows={3}
        fullWidth
        margin="normal"
      />
      <TextFieldWithTokenCounter
        id="personality"
        label="Personality"
        value={characterEditorState.personality}
        helperText="A brief description of the personality."
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextFieldWithTokenCounter
        id="mes_example"
        label="Message Example"
        value={characterEditorState.mes_example}
        onChange={handleChange}
        helperText={
          <>
            Describes how the character speaks. Before each example, you need to
            add the <CopyButton textToCopy="<START>">&lt;START&gt;</CopyButton>{' '}
            macro.
          </>
        }
        multiline
        minRows={3}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextFieldWithTokenCounter
        id="scenario"
        label="Scenario"
        value={characterEditorState.scenario}
        onChange={handleChange}
        helperText="Circumstances and context of the dialogue."
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextFieldWithTokenCounter
        id="first_mes"
        label="First Message"
        value={characterEditorState.first_mes}
        onChange={handleChange}
        helperText="The First Message is an important thing that sets exactly how and in what style the character will communicate."
        multiline
        minRows={3}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Typography
        variant="h3"
        gutterBottom
      >
        Alternate Greetings
      </Typography>
      <Typography
        variant="caption"
        component="p"
        gutterBottom
      >
        You can add as many alternative greetings as you wish to your character.
        These greetings will be used as alternatives to the First Message.
      </Typography>
      {characterEditorState.alternate_greetings.length > 0 &&
        characterEditorState.alternate_greetings.map((greeting, index) => (
          <TextFieldWithTokenCounter
            key={`alternate_greeting_${index}`}
            id={`alternate_greeting[${index}]`}
            label={`Alternate Greeting ${index + 1}`}
            value={greeting}
            onChange={(event) => {
              const newAlternateGreetings = [
                ...characterEditorState.alternate_greetings
              ]
              newAlternateGreetings[index] = event.target.value
              dispatch(
                updateCharacterEditor({
                  alternate_greetings: newAlternateGreetings
                })
              )
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => {
                      const newAlternateGreetings = [
                        ...characterEditorState.alternate_greetings
                      ]
                      newAlternateGreetings.splice(index, 1)
                      dispatch(
                        updateCharacterEditor({
                          alternate_greetings: newAlternateGreetings
                        })
                      )
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      size="sm"
                    />
                  </IconButton>
                </InputAdornment>
              )
            }}
            multiline
            minRows={2}
            variant="outlined"
            fullWidth
            margin="normal"
          />
        ))}
      <Button
        variant="contained"
        onClick={() => {
          dispatch(
            updateCharacterEditor({
              alternate_greetings: [
                ...characterEditorState.alternate_greetings,
                'Hello!'
              ]
            })
          )
        }}
        sx={{
          marginY: 2
        }}
      >
        Add Alternate Greeting
      </Button>
      <Typography
        variant="h3"
        gutterBottom
      >
        Image
      </Typography>
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
      <ToolbarDial />
    </>
  )
}

export default CharacterData
