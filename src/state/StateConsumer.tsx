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
        >
          <DialogTitle>{dialog?.title}</DialogTitle>
          <DialogContent>
            {dialog?.content}
          </DialogContent>
          <DialogActions>
            <Button
              type="button"
              color="inherit"
              variant='contained'
              onClick={() => {
                if (dialog?.onCancel !== undefined) {
                  dialog?.onCancel()
                }
                dispatch(closeDialog())
              }}
            >
              {dialog?.cancelText}
            </Button>
            <Button
              type="button"
              color="success"
              variant='contained'
              onClick={() => {
                if (dialog?.onConfirm !== undefined) {
                  dialog.onConfirm()
                }
                dispatch(closeDialog())
              }}
            >
              {dialog?.confirmText}
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </>
  )
}

export default StateConsumer
