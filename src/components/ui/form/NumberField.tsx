import NumberInput, {
  type NumberInputProps
} from '@/components/ui/form/NumberInput'
import {
  FormControl,
  type FormControlProps,
  FormHelperText,
  type FormHelperTextProps,
  InputLabel,
  type InputLabelProps
} from '@mui/material'
import { type FC, useId } from 'react'

export interface NumberFieldProps extends NumberInputProps {
  FormControlProps?: FormControlProps
  helperText?: string
  HelperTextProps?: FormHelperTextProps
  fullWidth?: boolean
  margin?: FormControlProps['margin']
  label?: string
  InputLabelProps?: Omit<InputLabelProps, 'htmlFor' & 'shrink'>
}

const NumberField: FC<NumberFieldProps> = ({
  FormControlProps,
  helperText,
  HelperTextProps,
  fullWidth,
  onChange,
  id,
  margin,
  label,
  InputLabelProps,
  ...NumberInputProps
}) => {
  const formalId = id ?? useId()
  return (
    <FormControl
      {...FormControlProps}
      fullWidth={fullWidth ?? FormControlProps?.fullWidth}
      margin={margin ?? FormControlProps?.margin}
    >
      <NumberInput
        {...NumberInputProps}
        id={formalId}
        onChange={(event, value) => {
          event.stopPropagation()
          if (onChange !== undefined) onChange(event, value)
        }}
      />
      {label !== undefined && (
        <InputLabel
          {...InputLabelProps}
          htmlFor={formalId}
          shrink={true}
          sx={(theme) => ({
            backgroundColor: theme.palette.background.default,
            paddingInline: theme.spacing(1)
          })}
        >
          {label}
        </InputLabel>
      )}
      {helperText !== undefined && (
        <FormHelperText
          {...HelperTextProps}
          id={`${formalId}-helper-text`}
        >
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default NumberField
