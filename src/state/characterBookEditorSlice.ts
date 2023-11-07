import { type CharacterBookEditorState } from '@/types/lorebook'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: CharacterBookEditorState = {
  name: '',
  entries: [],
  extensions: {},
  recursive_scanning: false,
  scan_depth: 1,
  token_budget: 1000,
  description: ''
}

const exampleCharacterBookObject: CharacterBookEditorState = {
  name: 'Lorebook',
  entries: [],
  extensions: {},
  recursive_scanning: false,
  scan_depth: 1,
  token_budget: 1000,
  description: 'A simple lorebook that can help you understand.'
}

const characterBookEditorSlice = createSlice({
  name: 'characterBookEditor',
  initialState,
  reducers: {
    setCharacterBookEditor: (_, action: PayloadAction<CharacterBookEditorState>) => {
      return action.payload
    },
    updateCharacterBookEditor: (state, action: PayloadAction<Partial<CharacterBookEditorState>>) => {
      return { ...state, ...action.payload }
    },
    clearCharacterBookEditor: () => {
      return initialState
    },
    setExampleCharacterBookEditor: () => {
      return exampleCharacterBookObject
    }
  }
})

export default characterBookEditorSlice

export const { clearCharacterBookEditor, setCharacterBookEditor, setExampleCharacterBookEditor, updateCharacterBookEditor } = characterBookEditorSlice.actions
