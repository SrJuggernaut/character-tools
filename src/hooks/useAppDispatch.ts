import { type AppDispatch } from '@/state/store'
import { useDispatch } from 'react-redux'

const useAppDispatch: () => AppDispatch = useDispatch

export default useAppDispatch
