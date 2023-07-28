import appSlice from '@/state/appSlice'
import { configureStore } from '@reduxjs/toolkit'
import feedbackSlice from './feedbackSlice'

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    feedback: feedbackSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
