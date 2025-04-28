import { type Alert, type Dialog, type feedbackState } from '@/types/feedback'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: feedbackState = {
  openAlert: false,
  openDialog: false
}

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<Alert>): feedbackState => {
      return {
        ...state,
        openAlert: true,
        alert: action.payload
      }
    },
    closeAlert: (state, _: PayloadAction<undefined>): feedbackState => {
      return {
        ...state,
        openAlert: false
      }
    },
    clearAlert: (state, _: PayloadAction<undefined>): feedbackState => {
      return {
        ...state,
        alert: undefined
      }
    },
    setDialog: (state, action: PayloadAction<Dialog>): feedbackState => {
      return {
        ...state,
        openDialog: true,
        dialog: action.payload
      }
    },
    closeDialog: (state, _: PayloadAction<undefined>): feedbackState => {
      return {
        ...state,
        openDialog: false
      }
    },
    clearDialog: (state, _: PayloadAction<undefined>): feedbackState => {
      return {
        ...state,
        dialog: undefined
      }
    }
  }
})

export default feedbackSlice

export const {
  setAlert,
  closeAlert,
  clearAlert,
  setDialog,
  closeDialog,
  clearDialog
} = feedbackSlice.actions
