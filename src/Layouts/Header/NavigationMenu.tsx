import { faBars, faHome, faUserPen, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from '@mui/material'
import { useState, type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MenuLink {
  label: string
  url: string
  icon: IconDefinition
}

const MenuLinks: MenuLink[] = [
  { label: 'Home', url: '/', icon: faHome },
  { label: 'Character Editor', url: '/character-editor', icon: faUserPen }
]

const NavigationMenu: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const location = useLocation()
  console.log(location)
  return (
    <>
      <IconButton
        onClick={() => { setOpenDrawer(true) }}
      >
        <FontAwesomeIcon icon={faBars} fixedWidth size="sm" />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={openDrawer}
        onClose={() => { setOpenDrawer(false) }}
        onOpen={() => { setOpenDrawer(true) }}
      >
        <Box
          sx={(theme) => ({
            minWidth: '100%',
            width: '100lvw',
            [theme.breakpoints.up('sm')]: {
              maxWidth: '250px'
            }
          })}
          role="presentation"
          onClick={() => { setOpenDrawer(false) }}
        >
          <List
            disablePadding
          >
            {MenuLinks.map((menuLink, index) => (
              <ListItem
                disableGutters
                key={`menu-link-${index}`}
              >
                <ListItemButton
                  component={Link}
                  to={menuLink.url}
                  selected={location.pathname === menuLink.url}
                >
                  <ListItemIcon>
                    <FontAwesomeIcon icon={menuLink.icon} fixedWidth />
                  </ListItemIcon>
                  <ListItemText primary={menuLink.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </>
  )
}

export default NavigationMenu
