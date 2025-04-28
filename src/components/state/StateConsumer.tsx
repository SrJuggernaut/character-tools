import AlertsSnackbar from '@/components/state/AlertsSnackbar'
import FeedbackDialog from '@/components/state/FeedbackDialog'
import useAppSelector from '@/hooks/useAppSelector'
import { ThemeProvider, createTheme } from '@mui/material'
import { type FC, type ReactNode, useMemo } from 'react'
import { darkTheme, lightTheme } from 'srjuggernaut-mui-theme'
import SettingsDialog from '@/components/state/SettingsDialog'

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
        <AlertsSnackbar />
        <FeedbackDialog />
        <SettingsDialog />
      </ThemeProvider>
    </>
  )
}

export default StateConsumer
