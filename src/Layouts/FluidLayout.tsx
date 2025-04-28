import Header from '@/Layouts/Header'
import { Box } from '@mui/material'
import { type FC, type ReactNode } from 'react'

export interface FluidProps {
  children?: ReactNode
}

const Fluid: FC<FluidProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={(theme) => ({
          minHeight: 'calc(100vh - 70px)',
          padding: theme.spacing(2),
          marginBlockStart: '70px',
          position: 'relative'
        })}
      >
        {children}
      </Box>
    </>
  )
}

export default Fluid
