import DropImport from '@/components/characterEditor/DropImport'
import useAppDispatch from '@/hooks/useAppDispatch'
import { clearCharacterEditor, loadExampleCharacter } from '@/state/characterEditorSlice'
import { Box, Button, Typography } from '@mui/material'
import { type FC } from 'react'

const ImportOrCreate: FC = () => {
  const dispatch = useAppDispatch()
  return (
    <>
      <Typography variant="h2" align="center" gutterBottom>Import or Create</Typography>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: theme.spacing(2),
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          }
        })}
      >
        <div>
          <DropImport/>
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Typography variant="subtitle1" component="h2" align="center" gutterBottom>
            Create a new character
          </Typography>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch(clearCharacterEditor())
            }}
          >
            Clean character editor
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              dispatch(loadExampleCharacter())
            }}
          >
            load example character
          </Button>
        </div>
      </Box>
    </>
  )
}

export default ImportOrCreate
