import { type ReactNode } from 'react'

export interface Alert {
  severity: 'success' | 'info' | 'warning' | 'error'
  title: string
  message?: string
}

export interface Dialog {
  title: string
  content: ReactNode
  onConfirm?: () => void
  confirmText?: string
  onCancel?: () => void
  cancelText?: string
}

export interface feedbackState {
  openAlert: boolean
  alert?: Alert
  openDialog: boolean
  dialog?: Dialog
}
