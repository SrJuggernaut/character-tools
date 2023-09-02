import appSlice from '@/state/appSlice'
import { configureStore } from '@reduxjs/toolkit'
import characterEditorSlice from './characterEditorSlice'
import feedbackSlice from './feedbackSlice'

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    feedback: feedbackSlice.reducer,
    characterEditor: characterEditorSlice.reducer
  },
  middleware (getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['feedback.dialog.onCancel', 'feedback.dialog.onConfirm'],
        ignoredActionPaths: ['payload.onCancel', 'payload.onConfirm']
      }
    })
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
