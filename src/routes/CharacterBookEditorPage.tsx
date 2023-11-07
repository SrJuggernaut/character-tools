import FluidLayout from '@/Layouts/FluidLayout'
import CharacterBookData from '@/components/characterBookEditor/CharacterBookData'
import EntriesEditor from '@/components/characterBookEditor/EntriesEditor'
import ExportOrSave from '@/components/characterBookEditor/ExportOrSave'
import ImportOrCreate from '@/components/characterBookEditor/ImportOrCreate'
import BookFont from '@/components/icons/bookFont'
import { faBook, faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab, Typography, useMediaQuery, type Theme } from '@mui/material'
import { useEffect, useState, type FC } from 'react'
import { useSearchParams } from 'react-router-dom'

type tabs = 'import-create' | 'characterbook-data' | 'entries' | 'export-or-save'

const CharacterBookEditorPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const isMediumScreen = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const [currentTab, setCurrentTab] = useState<tabs>('import-create')

  useEffect(() => {
    if (searchParams.has('tab')) {
      const tab = searchParams.get('tab')
      if (tab === 'import-create' || tab === 'characterbook-data' || tab === 'entries' || tab === 'export-or-save') {
        setCurrentTab(tab)
      }
      setSearchParams({})
    }
  }, [])

  return (
    <FluidLayout>
      <Typography variant="h1" align="center" gutterBottom>Character Book Editor</Typography>
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
            <Tab icon={<FontAwesomeIcon icon={faBook}/>} label="Character Book Data" value="characterbook-data" />
            <Tab icon={<FontAwesomeIcon icon={BookFont}/>} label="Entries" value="entries" />
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
          <TabPanel value="characterbook-data">
            <CharacterBookData />
          </TabPanel>
          <TabPanel value="entries">
            <EntriesEditor />
          </TabPanel>
          <TabPanel value="export-or-save">
            <ExportOrSave />
          </TabPanel>
        </div>
      </TabContext>
    </FluidLayout>
  )
}
export default CharacterBookEditorPage
