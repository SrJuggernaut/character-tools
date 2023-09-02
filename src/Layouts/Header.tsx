import NavigationMenu from '@/Layouts/Header/NavigationMenu'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setTheme } from '@/state/appSlice'
import { faMoon, faScrewdriverWrench, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Link as MuiLink, Typography } from '@mui/material'
import { visuallyHidden } from '@mui/utils'
import { type FC } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

const Header: FC = () => {
  const theme = useAppSelector((state) => state.app.theme)
  const dispatch = useAppDispatch()
  return (
    <Box
      component="header"
      sx={(theme) => ({
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[1],
        zIndex: theme.zIndex.appBar,
        minHeight: '70px',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%'
      })}
    >
      <div>
        <MuiLink
          component={ReactRouterLink}
          to="/"
          sx={{ color: 'inherit', textDecoration: 'none' }}
        >
          <Typography sx={visuallyHidden}>
            Character Tools
          </Typography>
          <FontAwesomeIcon icon={faScrewdriverWrench} fixedWidth size="2x" />
        </MuiLink>
      </div>
      <div>
        <IconButton
          type="button"
          onClick={() => {
            dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
          }}
        >
          {theme === 'light' && <FontAwesomeIcon icon={faMoon} fixedWidth size="sm" />}
          {theme === 'dark' && <FontAwesomeIcon icon={faSun} fixedWidth size="sm"/>}
        </IconButton>
        <NavigationMenu />
      </div>
    </Box>
  )
}

export default Header
