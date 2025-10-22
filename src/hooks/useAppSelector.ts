import { type TypedUseSelectorHook, useSelector } from 'react-redux'
import { type RootState } from '@/state/store'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
