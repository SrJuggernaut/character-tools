import useAppSelector from '@/hooks/useAppSelector'
import { ThemeProvider, createTheme } from '@mui/material'
import { useMemo, type FC, type ReactNode } from 'react'
import { darkTheme, lightTheme } from 'srjuggernaut-mui-theme'
export interface StateConsumerProps {
  children?: ReactNode
}

const StateConsumer: FC<StateConsumerProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.app.theme)
  const createdTheme = useMemo(() => {
    if (theme === 'light') return createTheme(lightTheme)
    return createTheme(darkTheme)
  }, [theme])
  return (
    <>
      <ThemeProvider theme={createdTheme}>
        {children}
      </ThemeProvider>
    </>
  )
}

export default StateConsumer
