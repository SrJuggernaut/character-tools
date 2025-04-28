import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { updateCharacterBookEditor } from '@/state/characterBookEditorSlice'
import { type CharacterBookEntry } from '@/types/lorebook'
import { faArrowLeft, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, IconButton, Paper, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'
import { type FC, useState } from 'react'
import EntryEditor from './EntryEditor'

const EntriesEditor: FC = () => {
  const [editingEntry, setEditingEntry] = useState<number | undefined>(
    undefined
  )
  const characterEditorState = useAppSelector(
    (state) => state.characterBookEditor
  )
  const dispatch = useAppDispatch()

  const handleUpdateEntry = (
    index: number,
    entry: CharacterBookEntry
  ): void => {
    const newEntries = [...characterEditorState.entries]
    newEntries[index] = entry
    dispatch(updateCharacterBookEditor({ entries: newEntries }))
  }

  return (
    <div
      css={{
        overflowX: 'hidden'
      }}
    >
      <Typography
        variant="h2"
        align="center"
        gutterBottom
      >
        {editingEntry === undefined ? 'Entries' : 'Entry editor'}
      </Typography>
      <AnimatePresence
        initial={false}
        mode="popLayout"
        presenceAffectsLayout
      >
        {editingEntry === undefined && (
          <motion.div
            key="entries-list"
            css={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingBlock: '16px'
            }}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
          >
            {characterEditorState.entries.map((entry, index) => (
              <Paper
                key={`entry-${index}`}
                sx={{
                  padding: '16px',
                  display: 'flex'
                }}
              >
                <div
                  css={{
                    flexGrow: 1
                  }}
                >
                  <Typography variant="h3">
                    <small>#{index + 1}</small>&nbsp;
                    {entry.name === undefined || entry.name === ''
                      ? `Unnamed entry ${index + 1}`
                      : entry.name}
                  </Typography>
                  {entry.comment !== undefined || entry.comment !== '' ? (
                    <Typography variant="body1">{entry.comment}</Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      color="text.secondary"
                    >
                      No comment
                    </Typography>
                  )}
                </div>
                <div>
                  <IconButton
                    onClick={() => {
                      setEditingEntry(index)
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      size="sm"
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      const newEntries = [...characterEditorState.entries]
                      newEntries.splice(index, 1)
                      dispatch(
                        updateCharacterBookEditor({ entries: newEntries })
                      )
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="sm"
                    />
                  </IconButton>
                </div>
              </Paper>
            ))}
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                dispatch(
                  updateCharacterBookEditor({
                    entries: [
                      ...characterEditorState.entries,
                      {
                        name: '',
                        content: '',
                        enabled: true,
                        extensions: {},
                        insertion_order: 1,
                        keys: [],
                        case_sensitive: false,
                        comment: '',
                        constant: false,
                        position: 'before_char',
                        priority: 10,
                        secondary_keys: [],
                        selective: false
                      }
                    ]
                  })
                )
                setEditingEntry(characterEditorState.entries.length)
              }}
            >
              Add Entry
            </Button>
          </motion.div>
        )}
        {editingEntry !== undefined && (
          <motion.div
            key={`entry-${editingEntry}`}
            transition={{ ease: 'easeInOut', duration: 0.3 }}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
          >
            <div
              css={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBlock: '16px'
              }}
            >
              <IconButton
                type="button"
                onClick={() => {
                  setEditingEntry(undefined)
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  size="sm"
                />
              </IconButton>
            </div>
            <EntryEditor
              onChange={(entry) => {
                handleUpdateEntry(editingEntry, entry)
              }}
              value={characterEditorState.entries[editingEntry]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default EntriesEditor
