import Books from '@/components/icons/books'
import { faBars, faBook, faDatabase, faHome, faUserPen, faUsersBetweenLines, type IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer, Tooltip } from '@mui/material'
import { useState, type FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface MenuLink {
  label: string
  url: string
  icon: IconDefinition
}

const MenuLinks: MenuLink[] = [
  { label: 'Home', url: '/', icon: faHome },
  { label: 'Character Editor', url: '/character-editor', icon: faUserPen },
  { label: 'Character Library', url: '/character-library', icon: faUsersBetweenLines },
  { label: 'CharacterBook Editor', url: '/characterbook-editor', icon: faBook },
  { label: 'CharacterBook Library', url: '/characterbook-library', icon: Books },
  { label: 'Manage Database', url: '/manage-database', icon: faDatabase }
]

const NavigationMenu: FC = () => {
  const [openDrawer, setOpenDrawer] = useState(false)
  const location = useLocation()
  return (
    <>
      <Tooltip title="Menu">
        <IconButton
          onClick={() => { setOpenDrawer(true) }}
        >
          <FontAwesomeIcon icon={faBars} fixedWidth size="sm" />
        </IconButton>
      </Tooltip>
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
          <Box
            sx={(theme) => ({
              height: '78px',
              borderBottom: `1px solid ${theme.palette.divider}`
            })}
          />
          <List
            disablePadding
          >
            {MenuLinks.map((menuLink, index) => (
              <ListItem
                disableGutters
                disablePadding
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
