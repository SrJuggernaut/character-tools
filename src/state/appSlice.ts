import { type AppState } from '@/types/app'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

const initialState: AppState = {
  theme: window.localStorage.getItem('theme') as AppState['theme'] ?? 'dark'
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
    }
  }
})

export default appSlice

export const { setTheme } = appSlice.actions
