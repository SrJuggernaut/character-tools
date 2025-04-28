import Export from '@/components/characterEditor/exportOrSave/ExportCharacter'
import SaveCharacter from '@/components/characterEditor/exportOrSave/SaveCharacter'
import { Box, Typography } from '@mui/material'
import { type FC } from 'react'

const ExportOrSave: FC = () => {
  return (
    <>
      <Typography
        variant="h2"
        align="center"
        gutterBottom
      >
        Export or Save
      </Typography>
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
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
          >
            Save
          </Typography>
          <SaveCharacter />
        </div>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
          >
            Export
          </Typography>
          <Export />
        </div>
      </Box>
    </>
  )
}

export default ExportOrSave
