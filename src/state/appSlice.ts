import { type AppState } from '@/types/app'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AppState = {
  theme: window.localStorage.getItem('theme') as AppState['theme'] ?? 'dark',
  tokenizer: window.localStorage.getItem('tokenizer') as AppState['tokenizer'] ?? 'llama',
  openSettings: false
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<AppState['theme']>) => {
      window.localStorage.setItem('theme', action.payload)
      return {
        ...state,
        theme: action.payload
      }
    },
    setTokenizer: (state, action: PayloadAction<AppState['tokenizer']>) => {
      window.localStorage.setItem('tokenizer', action.payload)
      return {
        ...state,
        tokenizer: action.payload
      }
    },
    setOpenSettings: (state, action: PayloadAction<AppState['openSettings']>) => {
      return {
        ...state,
        openSettings: action.payload
      }
    }
  }
})

export default appSlice

export const { setTheme, setTokenizer, setOpenSettings } = appSlice.actions
