import Fluid from '@/Layouts/FluidLayout'
import CharacterBookTable from '@/components/characterBookLibrary/CharacterBookTable'
import ImportCharacterBooks from '@/components/characterBookLibrary/ImportCharacterBooks'
import ManageLibrary from '@/components/characterBookLibrary/ManageLibrary'
import bookArrowUp from '@/components/icons/bookArrowUp'
import Books from '@/components/icons/books'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Typography, useMediaQuery, type Theme } from '@mui/material'
import { useState, type FC } from 'react'

type Tabs = 'Library' | 'Manage' | 'Import'

const CharacterBookLibrary: FC = () => {
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const [currentTab, setCurrentTab] = useState<Tabs>('Library')
  return (
    <Fluid>
      <Typography variant="h1" align="center" gutterBottom>Character Book Library</Typography>
      <TabContext value={currentTab}>
        <Box
          sx={(theme) => ({
            backgroundColor: theme.palette.background.paper,
            position: 'fixed',
            width: '100%',
            bottom: 0,
            marginX: theme.spacing(-2),
            zIndex: theme.zIndex.appBar
          })}
        >
          <TabList
            variant={isMediumScreen ? 'fullWidth' : 'scrollable'}
            scrollButtons="auto"
            allowScrollButtonsMobile
            onChange={(_, newValue) => { setCurrentTab(newValue) }}
          >
            <Tab icon={<FontAwesomeIcon icon={Books} />} label="Character Book Library" value="Library" />
            <Tab icon={<FontAwesomeIcon icon={bookArrowUp} />} label="Import Character Book" value="Import" />
            <Tab icon={<FontAwesomeIcon icon={Books} />} label="Manage Library" value="Manage" />
          </TabList>
        </Box>

        <div
          css={{
            marginBottom: '72px'
          }}
        >
          <TabPanel value="Library">
            <CharacterBookTable />
          </TabPanel>
          <TabPanel value="Import">
            <ImportCharacterBooks />
          </TabPanel>
          <TabPanel value="Manage">
            <ManageLibrary />
          </TabPanel>
        </div>
      </TabContext>
    </Fluid>
  )
}
export default CharacterBookLibrary
