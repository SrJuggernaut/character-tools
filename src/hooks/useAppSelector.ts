import { type RootState } from '@/state/store'
import { useSelector, type TypedUseSelectorHook } from 'react-redux'

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default useAppSelector
