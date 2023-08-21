import Fluid from '@/Layouts/FluidLayout'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardActionArea, CardContent, IconButton, Typography } from '@mui/material'
import { type FC } from 'react'

const Home: FC = () => {
  return (
    <Fluid>
      <div
        css={{
          minHeight: 'calc(100vh - 68px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          margin: '-16px',
          position: 'relative',
          zIndex: 'auto'
        }}
      >
        <Typography variant='h1' align="center">Character Tools</Typography>
        <Typography variant='h2' component="div" align="center">A collection of tools for creating and managing characters for IA Roleplay</Typography>
        <IconButton
          aria-label="Scroll down"
          color="primary"
          sx={{
            position: 'absolute',
            bottom: '16px',
            animationName: 'bounce',
            animationDuration: '2s',
            animationIterationCount: 'infinite',
            animationTimingFunction: 'ease-in-out',
            animationDelay: '3s',
            '@keyframes bounce': {
              '0%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-8px)' },
              '100%': { transform: 'translateY(0)' }
            },
            '&:hover': {
              animationPlayState: 'paused'
            }
          }}
          component="a"
          href="#tools"
        >
          <FontAwesomeIcon icon={faChevronDown} size="lg" />
        </IconButton>
      </div>
      <div
        css={{
          minHeight: 'calc(50vh)'
        }}
        id="tools"
      >
        <Typography variant='h2' component="div" align="center">Tools</Typography>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gridGap: '16px',
            padding: '16px'
          }}
        >
          <Card>
            <CardActionArea
              component="a"
              href="/character-editor"
            >
              <CardContent>
                <Typography variant="h3" align="center" gutterBottom>Character Editor</Typography>
                <Typography variant="body1" align="center">
                  Create and edit characters for IA Roleplay, with support for Image Cards, V1 and V2, and more!
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      </div>
    </Fluid>
  )
}

export default Home
