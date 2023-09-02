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
import { useEffect, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'

type tabs = 'import-create' | 'character-data' | 'character-metadata' | 'prompt-engineering' | 'export-or-save'

const CharacterEditorPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  const [currentTab, setCurrentTab] = useState<tabs>('import-create')
  useEffect(() => {
    if (searchParams.has('tab')) {
      const tab = searchParams.get('tab')
      if (tab === 'import-create' || tab === 'character-data' || tab === 'character-metadata' || tab === 'prompt-engineering' || tab === 'export-or-save') {
        setCurrentTab(tab)
      }
      setSearchParams({})
    }
  }, [])

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
            <Tab icon={<FontAwesomeIcon icon={faFileImport}/>} label="Import or Create" value="import-create" />
            <Tab icon={<FontAwesomeIcon icon={faUserCog}/>} label="Character Data" value="character-data" />
            <Tab icon={<FontAwesomeIcon icon={faCircleInfo}/>} label="Character Metadata" value="character-metadata" />
            <Tab icon={<FontAwesomeIcon icon={faUserGear}/>} label="Prompt Engineering" value="prompt-engineering" />
            <Tab icon={<FontAwesomeIcon icon={faFileExport}/>} label="Export or Save" value="export-or-save" />
          </TabList>
        </Box>
        <div
          css={{
            marginBottom: '72px'
          }}
        >
          <TabPanel value="import-create">
            <ImportOrCreate />
          </TabPanel>
          <TabPanel value="character-data">
            <CharacterData />
          </TabPanel>
          <TabPanel value="character-metadata">
            <CharacterMetadata />
          </TabPanel>
          <TabPanel value="prompt-engineering">
            <PromptEngingeering />
          </TabPanel>
          <TabPanel value="export-or-save">
            <ExportOrSave />
          </TabPanel>
        </div>
      </TabContext>
    </FluidLayout>
  )
}

export default CharacterEditorPage
