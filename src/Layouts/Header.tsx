import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { setTheme } from '@/state/appSlice'
import { faMoon, faScrewdriverWrench, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton } from '@mui/material'
import { type FC } from 'react'

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
        minHeight: '70px'
      })}
    >
      <div>
        <FontAwesomeIcon icon={faScrewdriverWrench} fixedWidth size="2x" />
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
      </div>
    </Box>
  )
}

export default Header
