import NavigationMenu from '@/Layouts/Header/NavigationMenu'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setOpenSettings, setTheme } from '@/state/appSlice'
import { faBug, faMoon, faScrewdriverWrench, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, Link as MuiLink, Tooltip, Typography } from '@mui/material'
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
        <Tooltip title="Home">
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
        </Tooltip>
      </div>
      <div>
        <Tooltip title="Report a bug">
          <IconButton
            component="a"
            href="https://github.com/SrJuggernaut/character-tools/issues"
            target="_blank"
          >
            <FontAwesomeIcon icon={faBug} fixedWidth size="sm" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton
            component="button"
            onClick={() => {
              dispatch(setOpenSettings(true))
            }}
          >
            <FontAwesomeIcon icon={faScrewdriverWrench} fixedWidth size="sm" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Toggle theme">
          <IconButton
            type="button"
            onClick={() => {
              dispatch(setTheme(theme === 'light' ? 'dark' : 'light'))
            }}
          >
            {theme === 'light' && <FontAwesomeIcon icon={faMoon} fixedWidth size="sm" />}
            {theme === 'dark' && <FontAwesomeIcon icon={faSun} fixedWidth size="sm" />}
          </IconButton>
        </Tooltip>
        <NavigationMenu />
      </div>
    </Box>
  )
}

export default Header
