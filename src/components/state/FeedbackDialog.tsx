import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { clearDialog, closeDialog } from '@/state/feedbackSlice'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useEffect, type FC } from 'react'

const FeedbackDialog: FC = () => {
  const { openDialog, dialog } = useAppSelector((state) => state.feedback)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!openDialog) {
      const timeout = setTimeout(() => {
        dispatch(clearDialog())
      }, 500)
      return () => { clearTimeout(timeout) }
    }
  }, [openDialog])

  return (
    <Dialog
      open={openDialog}
      keepMounted={false}
      maxWidth='sm'
    >
      <DialogTitle variant='subtitle1'>{dialog?.title}</DialogTitle>
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
  )
}
export default FeedbackDialog
