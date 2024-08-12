import { type CharacterBookEntry } from '@/types/lorebook'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Checkbox, Chip, FormControlLabel, FormGroup, FormLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useState, type FC } from 'react'
import NumberField from '../ui/form/NumberField'

export interface EntryEditorProps {
  value: CharacterBookEntry
  onChange: (value: CharacterBookEntry) => void
}

const EntryEditor: FC<EntryEditorProps> = ({ onChange, value }) => {
  const [keyToAdd, setKeyToAdd] = useState('')
  const [secondaryKeyToAdd, setSecondaryKeyToAdd] = useState('')
  return (
    <>
      <TextField
        id="name"
        label="Name"
        value={value.name ?? ''}
        helperText="The name of your entry. This will be used to identify your entry in the entry list."
        onChange={(e) => {
          onChange({ ...value, name: e.target.value })
        }}
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        id="comment"
        label="Comment"
        helperText="A comment for your entry."
        value={value.comment ?? ''}
        onChange={(e) => {
          onChange({ ...value, comment: e.target.value })
        }}
        multiline
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <NumberField
        id="priority"
        label="Priority"
        value={value.priority ?? 10}
        onChange={(_, newValue) => {
          onChange({ ...value, priority: newValue ?? undefined })
        }}
        error={value.priority === undefined}
        helperText="The higher the number, the higher the priority. The lower the number, the entry will be discarded first if token budget is exceeded."
        fullWidth
        margin="normal"
      />
      <NumberField
        id="insertion_order"
        label="Insertion Order"
        value={value.insertion_order ?? 1}
        onChange={(_, newValue) => {
          if (newValue === undefined || newValue === null) {
            onChange({ ...value, insertion_order: 0 })
          } else {
            onChange({ ...value, insertion_order: newValue })
          }
        }}
        error={value.insertion_order === undefined}
        helperText="If multiple entries have the same priority, the entry with the lowest insertion order will be inserted first."
        fullWidth
        margin="normal"
      />
      <FormGroup
        sx={{
          paddingBlock: '16px'
        }}
      >
        <FormLabel
          id="position"
        >
          Position
        </FormLabel>
        <RadioGroup
          value={value.position ?? 'before_char'}
          onChange={(_, RadioValue) => {
            onChange({ ...value, position: RadioValue as 'before_char' | 'after_char' })
          }}
          row
        >
          <FormControlLabel
            value="before_char"
            control={<Radio />}
            label="Before Character"
          />
          <FormControlLabel
            value="after_char"
            control={<Radio />}
            label="After Character"
          />
        </RadioGroup>
      </FormGroup>
      <FormGroup
        row
        sx={{
          paddingBlock: '16px'
        }}
      >
        <FormControlLabel
          control={(
            <Checkbox
              checked={value.enabled}
              onChange={(e) => {
                onChange({ ...value, enabled: e.target.checked })
              }}
              name="enabled"
            />
          )}
          label="Enabled"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={value.case_sensitive ?? false}
              onChange={(e) => {
                onChange({ ...value, case_sensitive: e.target.checked })
              }}
              name="case_sensitive"
            />
          )}
          label="Case Sensitive"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={value.selective ?? false}
              onChange={(e) => {
                onChange({ ...value, selective: e.target.checked })
              }}
              name="selective"
            />
          )}
          label="Selective"
        />
        <FormControlLabel
          control={(
            <Checkbox
              checked={value.constant ?? false}
              onChange={(e) => {
                onChange({ ...value, constant: e.target.checked })
              }}
              name="constant"
            />
          )}
          label="Constant"
        />
      </FormGroup>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '8px',
          paddingBlock: '16px',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          }
        })}
      >
        <div>
          <Typography variant="h4" align="center">Keys</Typography>
          {value.keys.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              This entry has no keys.
            </Typography>
          )}
          {value.keys.length > 0 && (
            <div
              css={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              {value.keys.map((key, index) => (
                <Chip
                  label={key}
                  key={`key-${index}`}
                  onDelete={() => {
                    const newKeys = [...value.keys]
                    newKeys.splice(index, 1)
                    onChange({ ...value, keys: newKeys })
                  }}
                />
              ))}
            </div>
          )}
          <TextField
            id="add-key"
            label="Add Key"
            value={keyToAdd}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    onChange({ ...value, keys: [...value.keys, keyToAdd] })
                    setKeyToAdd('')
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </IconButton>
              )
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onChange({ ...value, keys: [...value.keys, keyToAdd] })
                setKeyToAdd('')
              }
            }}
            onChange={(e) => {
              setKeyToAdd(e.target.value)
            }}
            fullWidth
            margin="normal"
            helperText="Press enter to add key"
          />
        </div>
        <div>
          <Typography variant="h4" align="center">Secondary Keys</Typography>
          {value.secondary_keys.length === 0 && (
            <Typography variant="body1" color="text.secondary">
              This entry has no secondary keys.
            </Typography>
          )}
          {value.secondary_keys.length > 0 && (
            <div
              css={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              {value.secondary_keys.map((key, index) => (
                <Chip
                  label={key}
                  key={`secondary-key-${index}`}
                  onDelete={() => {
                    const newKeys = [...value.secondary_keys]
                    newKeys.splice(index, 1)
                    onChange({ ...value, secondary_keys: newKeys })
                  }}
                />
              ))}
            </div>
          )}
          <TextField
            id="add-secondary-key"
            label="Add Secondary Key"
            value={secondaryKeyToAdd}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => {
                    onChange({ ...value, secondary_keys: [...value.secondary_keys, secondaryKeyToAdd] })
                    setSecondaryKeyToAdd('')
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} size="sm" />
                </IconButton>
              )
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                onChange({ ...value, secondary_keys: [...value.secondary_keys, secondaryKeyToAdd] })
                setSecondaryKeyToAdd('')
              }
            }}
            onChange={(e) => {
              setSecondaryKeyToAdd(e.target.value)
            }}
            fullWidth
            margin="normal"
            helperText="Press enter to add key"
          />
        </div>
      </Box>
      <TextField
        id="content"
        label="Content"
        helperText="The content of the input, this is the information that will be sent to the language model, it generally accepts macros."
        value={value.content ?? ''}
        onChange={(e) => {
          onChange({ ...value, content: e.target.value })
        }}
        multiline
        minRows={3}
        variant="outlined"
        fullWidth
        margin="normal"
      />
    </>
  )
}
export default EntryEditor
