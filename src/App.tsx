import FluidLayout from '@/Layouts/FluidLayout'
import CharacterData from '@/components/characterEditor/CharacterData'
import CharacterMetadata from '@/components/characterEditor/CharacterMetadata'
import ExportOrSave from '@/components/characterEditor/ExportOrSave'
import ImportOrCreate from '@/components/characterEditor/ImportOrCreate'
import PromptEngingeering from '@/components/characterEditor/PromptEngingeering'
import { faCircleInfo, faFileExport, faFileImport, faUserCog, faUserGear } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Typography, useMediaQuery, type Theme } from '@mui/material'
import { useState, type FC } from 'react'

type tabs = 'Import or Create' | 'Character Data' | 'Character Metadata' | 'Prompt Engineering' | 'Export or Save'

const App: FC = () => {
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const [currentTab, setCurrentTab] = useState<tabs>('Import or Create')
  return (
    <FluidLayout>
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
            <Tab icon={<FontAwesomeIcon icon={faFileImport}/>} label="Import or Create" value="Import or Create" />
            <Tab icon={<FontAwesomeIcon icon={faUserCog}/>} label="Character Data" value="Character Data" />
            <Tab icon={<FontAwesomeIcon icon={faCircleInfo}/>} label="Character Metadata" value="Character Metadata" />
            <Tab icon={<FontAwesomeIcon icon={faUserGear}/>} label="Prompt Engineering" value="Prompt Engineering" />
            {/* <Tab icon={<FontAwesomeIcon icon={faFileExport}/>} label="Export or Save" value="Export or Save" /> */}
            <Tab icon={<FontAwesomeIcon icon={faFileExport}/>} label="Export" value="Export or Save" />
          </TabList>
        </Box>
        <div
          css={{
            marginBottom: '72px'
          }}
        >
          <TabPanel value="Import or Create">
            <ImportOrCreate />
          </TabPanel>
          <TabPanel value="Character Data">
            <CharacterData />
          </TabPanel>
          <TabPanel value="Character Metadata">
            <CharacterMetadata />
          </TabPanel>
          <TabPanel value="Prompt Engineering">
            <PromptEngingeering />
          </TabPanel>
          <TabPanel value="Export or Save">
            <ExportOrSave />
          </TabPanel>
        </div>
      </TabContext>
    </FluidLayout>
  )
}

export default App
