import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Unstable_NumberInput as BaseNumberInput, numberInputClasses, type NumberInputProps } from '@mui/base/Unstable_NumberInput'
import { styled } from '@mui/material/styles'
import { forwardRef, type ForwardedRef } from 'react'

export { type NumberInputProps } from '@mui/base/Unstable_NumberInput'

const NumberInput = forwardRef(function CustomNumberInput (
  props: NumberInputProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton
      }}
      slotProps={{
        incrementButton: {
          children: (
            <FontAwesomeIcon icon={faChevronUp} size='sm' />
          )
        },
        decrementButton: {
          children: (
            <FontAwesomeIcon icon={faChevronDown} size='sm' />
          )
        }
      }}
      {...props}
      ref={ref}
    />
  )
})

const StyledRoot = styled('div')(
  ({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
    fontWeight: 400,
    borderRadius: 8,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    display: 'grid',
    gridTemplateColumns: '1fr 19px',
    gridTemplateRows: '1fr 1fr',
    overflow: 'hidden',
    '&:hover': {
      borderColor: theme.palette.primary
    },
    [`&.${numberInputClasses.disabled}`]: {
      borderColor: theme.palette.divider,
      color: theme.palette.text.disabled
    },
    [`&.${numberInputClasses.error}`]: {
      borderColor: theme.palette.error.main
    },
    [`&.${numberInputClasses.focused}`]: {
      borderColor: theme.palette.primary.main
    },
    '&:focus-visible': {
      outline: 0
    }
  })
)

const StyledInputElement = styled('input')(
  ({ theme }) => ({
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    fontWeight: 400,
    lineHeight: 1.5,
    gridColumn: '1/2',
    gridRow: '1/3',
    color: theme.palette.text.primary,
    background: 'inherit',
    border: 'none',
    borderRadius: 'inherit',
    padding: '16.5px 14px',
    outline: 0,
    [`&.${numberInputClasses.disabled}`]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: theme.palette.action.disabledBackground,
      cursor: 'not-allowed'
    }
  })
)

const StyledButton = styled('button')(
  ({ theme }) => ({
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    appearance: 'none',
    padding: 0,
    width: '100%',
    height: '100%',
    fontFamily: theme.typography.fontFamily,
    fontSize: '0.875rem',
    boxSizing: 'border-box',
    lineHeight: 1.2,
    border: 0,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    transitionProperty: 'all',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '120',
    '&:hover': {
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.primary.light,
      cursor: 'pointer'
    },
    '&:active': {
      backgroundColor: theme.palette.primary.dark
    },
    [`&.${numberInputClasses.incrementButton}`]: {
      gridColumn: '2/3',
      gridRow: '1/2'
    },
    [`&.${numberInputClasses.decrementButton}`]: {
      gridColumn: '2/3',
      gridRow: '2/3'
    }
  })
)

export default NumberInput
