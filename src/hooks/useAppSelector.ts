import { type RootState } from '@/state/store'
import { type TypedUseSelectorHook, useSelector } from 'react-redux'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
