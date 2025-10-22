import { Button, Typography } from '@mui/material'
import { type FC } from 'react'
import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import Fluid from '@/Layouts/FluidLayout'

const ErrorRoute: FC = () => {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <Fluid>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            minHeight: 'calc(100vh - 150px)',
            padding: '2rem',
            position: 'relative'
          }}
        >
          <Typography
            variant="h1"
            align="center"
            gutterBottom
          >
            {error.status}
            <br />
            {error.statusText}
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/"
            size="large"
            css={{
              marginBlock: '1rem'
            }}
          >
            Go Home
          </Button>
        </div>
      </Fluid>
    )
  }
}

export default ErrorRoute
