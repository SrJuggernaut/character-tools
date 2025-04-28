import appSlice from '@/state/appSlice'
import { configureStore } from '@reduxjs/toolkit'
import characterBookEditorSlice from '@/state/characterBookEditorSlice'
import characterEditorSlice from '@/state/characterEditorSlice'
import feedbackSlice from '@/state/feedbackSlice'

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    feedback: feedbackSlice.reducer,
    characterEditor: characterEditorSlice.reducer,
    characterBookEditor: characterBookEditorSlice.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['feedback.dialog'],
        ignoreActions: true
      }
    })
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
