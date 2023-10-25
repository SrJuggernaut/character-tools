import { type ReactNode } from 'react'

export interface Alert {
  severity: 'success' | 'info' | 'warning' | 'error'
  title: string
  message?: string
}

export interface DialogAction {
  label: ReactNode
  severity?: 'success' | 'info' | 'warning' | 'error' | 'inherit' | 'primary' | 'secondary'
  onClick: () => void
}

export interface Dialog {
  title: string
  content: ReactNode
  actions: DialogAction[]
}

export interface feedbackState {
  openAlert: boolean
  alert?: Alert
  openDialog: boolean
  dialog?: Dialog
}
