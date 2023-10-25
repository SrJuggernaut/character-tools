import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { clearAlert, clearDialog, closeAlert, closeDialog } from '@/state/feedbackSlice'
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, ThemeProvider, createTheme } from '@mui/material'
import { useEffect, useMemo, type FC, type ReactNode } from 'react'
import { darkTheme, lightTheme } from 'srjuggernaut-mui-theme'
export interface StateConsumerProps {
  children?: ReactNode
}

const StateConsumer: FC<StateConsumerProps> = ({ children }) => {
  const theme = useAppSelector((state) => state.app.theme)
  const { alert, openAlert, openDialog, dialog } = useAppSelector((state) => state.feedback)
  const dispatch = useAppDispatch()

  const createdTheme = useMemo(() => {
    if (theme === 'light') return createTheme(lightTheme)
    return createTheme(darkTheme)
  }, [theme])

  useEffect(() => {
    if (!openDialog) {
      const timeout = setTimeout(() => {
        dispatch(clearDialog())
      }, 500)
      return () => { clearTimeout(timeout) }
    }
  }, [openDialog])

  useEffect(() => {
    if (!openAlert) {
      const timeout = setTimeout(() => {
        dispatch(clearAlert())
      }, 500)
      return () => { clearTimeout(timeout) }
    }
  }, [openAlert])

  return (
    <>
      <ThemeProvider theme={createdTheme}>
        {children}
        <Snackbar
          open={openAlert}
          sx={(theme) => ({
            width: '100%',
            [theme.breakpoints.up('sm')]: {
              maxWidth: '400px'
            }
          })}
        >
          <Alert
            severity={alert?.severity}
            onClose={() => {
              dispatch(closeAlert())
            }}
            sx={{
              width: '100%'
            }}
            variant='filled'
          >
            <AlertTitle>{alert?.title}</AlertTitle>
            {alert?.message}
          </Alert>
        </Snackbar>
        <Dialog
          open={openDialog}
          keepMounted={false}
          maxWidth='sm'
        >
          <DialogTitle>{dialog?.title}</DialogTitle>
          <DialogContent>
            {dialog?.content}
          </DialogContent>
          {dialog?.actions !== undefined && dialog?.actions.length > 0 && (
            <DialogActions>
              {dialog?.actions.map((action, index) => (
                <Button
                  key={index}
                  type="button"
                  color={action.severity}
                  variant='contained'
                  onClick={() => {
                    if (action.onClick !== undefined) {
                      action.onClick()
                    }
                    dispatch(closeDialog())
                  }}
                >
                  {action.label}
                </Button>
              ))}
            </DialogActions>
          )}
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default StateConsumer
