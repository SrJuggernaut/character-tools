import Fluid from '@/Layouts/FluidLayout'
import CharacterTable from '@/components/characterLibrary/CharacterTable'
import ImportCharacter from '@/components/characterLibrary/ImportCharacter'
import ManageLibrary from '@/components/characterLibrary/ManageLibrary'
import { faFileImport, faUsersBetweenLines } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Typography, useMediaQuery, type Theme } from '@mui/material'
import { useState, type FC } from 'react'

type Tabs = 'Library' | 'Manage' | 'Import'

const CharacterLibrary: FC = () => {
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const [currentTab, setCurrentTab] = useState<Tabs>('Library')
  return (
    <Fluid>
      <Typography variant="h1" align="center" gutterBottom>Character Editor</Typography>
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
            <Tab icon={<FontAwesomeIcon icon={faUsersBetweenLines} />} label="Character Library" value="Library" />
            <Tab icon={<FontAwesomeIcon icon={faFileImport} />} label="Import Character" value="Import" />
            <Tab icon={<FontAwesomeIcon icon={faUsersBetweenLines} />} label="Manage Library" value="Manage" />
          </TabList>
        </Box>

        <div
          css={{
            marginBottom: '72px'
          }}
        >
          <TabPanel value="Library">
            <CharacterTable />
          </TabPanel>
          <TabPanel value="Import">
            <ImportCharacter />
          </TabPanel>
          <TabPanel value="Manage">
            <ManageLibrary />
          </TabPanel>
        </div>
      </TabContext>
    </Fluid>
  )
}

export default CharacterLibrary
