import Fluid from '@/Layouts/FluidLayout'
import { Typography } from '@mui/material'
import { type FC } from 'react'

const Home: FC = () => {
  return (
    <Fluid>
      <div
        css={{
          height: '100%'
        }}
      >
        <Typography variant='h1'>Character Tools</Typography>
      </div>
    </Fluid>
  )
}

export default Home
