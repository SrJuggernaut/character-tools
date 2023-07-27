import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box } from '@mui/material'
import { type FC } from 'react'

const Header: FC = () => {
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
    </Box>
  )
}

export default Header
