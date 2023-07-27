import appSlice from '@/state/appSlice'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    app: appSlice.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
