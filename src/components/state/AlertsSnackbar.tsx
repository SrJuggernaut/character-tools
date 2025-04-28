import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { clearAlert, closeAlert } from '@/state/feedbackSlice'
import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { type FC, useEffect } from 'react'

const AlertsSnackbar: FC = () => {
  const { alert, openAlert } = useAppSelector((state) => state.feedback)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!openAlert) {
      const timeout = setTimeout(() => {
        dispatch(clearAlert())
      }, 500)
      return () => {
        clearTimeout(timeout)
      }
    }
  }, [openAlert])

  return (
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
        variant="filled"
      >
        <AlertTitle>{alert?.title}</AlertTitle>
        {alert?.message}
      </Alert>
    </Snackbar>
  )
}
export default AlertsSnackbar
