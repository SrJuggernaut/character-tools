import { type CharacterEditorState } from '@/types/character'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: CharacterEditorState = {
  name: '',
  description: '',
  personality: '',
  mes_example: '',
  scenario: '',
  first_mes: '',
  alternate_greetings: [],
  creator: '',
  character_version: '',
  tags: [],
  creator_notes: '',
  system_prompt: '',
  post_history_instructions: '',
  extensions: {}
}

const characterEditorSlice = createSlice({
  name: 'characterEditor',
  initialState,
  reducers: {
    setCharacterEditor: (_, action: PayloadAction<CharacterEditorState>) => {
      return action.payload
    },
    updateCharacterEditor: (state, action: PayloadAction<Partial<CharacterEditorState>>) => {
      return { ...state, ...action.payload }
    },
    clearCharacterEditor: () => {
      return initialState
    }
  }
})

export default characterEditorSlice

export const { setCharacterEditor, updateCharacterEditor, clearCharacterEditor } = characterEditorSlice.actions
