import { NumberField as BaseNumberField } from '@base-ui-components/react'
import {
  faArrowsLeftRight,
  faMinus,
  faPlus
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input
} from '@mui/material'
import { FC, ReactNode, useId } from 'react'

export interface NumberFieldProps {
  // Root
  id?: string
  name?: string
  defaultValue?: number
  value?: BaseNumberField.Root.Props['value']
  onValueChange?: BaseNumberField.Root.Props['onValueChange']
  onValueCommitted?: BaseNumberField.Root.Props['onValueCommitted']
  locale?: BaseNumberField.Root.Props['locale']
  format?: BaseNumberField.Root.Props['format']
  snapOnStep?: boolean
  step?: number
  smallStep?: number
  largeStep?: number
  min?: number
  max?: number
  allowWheelScrub?: boolean
  disabled?: boolean
  readOnly?: boolean
  className?: string
  // Label
  label?: ReactNode
  // Helper Text
  helperText?: ReactNode
  // FormControl
  error?: boolean
  fullWidth?: boolean
  margin?: 'none' | 'dense' | 'normal'
  required?: boolean
}

const NumberField: FC<NumberFieldProps> = ({
  id,
  className,
  label,
  helperText,
  error,
  fullWidth,
  margin,
  required,
  ...props
}) => {
  const inputId = useId()
  return (
    <FormControl
      error={error}
      fullWidth={fullWidth}
      margin={margin}
      required={required}
    >
      <BaseNumberField.Root
        {...props}
        id={id === undefined ? inputId : id}
      >
        <BaseNumberField.ScrubArea>
          <FormLabel htmlFor={id}>{label}</FormLabel>
          <BaseNumberField.ScrubAreaCursor>
            <FontAwesomeIcon icon={faArrowsLeftRight} />
          </BaseNumberField.ScrubAreaCursor>
        </BaseNumberField.ScrubArea>
        <BaseNumberField.Group
          css={{
            display: 'flex',
            alignItems: 'stretch',
            width: '100%'
          }}
        >
          <BaseNumberField.Decrement
            render={
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  padding: '0.25rem'
                }}
              />
            }
          >
            <FontAwesomeIcon
              icon={faMinus}
              size="lg"
            />
          </BaseNumberField.Decrement>
          <BaseNumberField.Input
            render={<Input css={{ flexGrow: 1, paddingInline: '0.5rem' }} />}
            data-invalid={error === true || undefined}
          />
          <BaseNumberField.Increment
            render={
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  padding: '0.25rem'
                }}
              />
            }
          >
            <FontAwesomeIcon
              icon={faPlus}
              size="lg"
            />
          </BaseNumberField.Increment>
        </BaseNumberField.Group>
      </BaseNumberField.Root>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}

export default NumberField
