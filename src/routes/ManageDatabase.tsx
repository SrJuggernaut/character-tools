import FluidLayout from '@/Layouts/FluidLayout'
import Drop from '@/components/ui/Drop'
import useAppDispatch from '@/hooks/useAppDispatch'
import {
  deleteDatabase,
  exportDatabase,
  importDatabase
} from '@/services/database'
import { setAlert, setDialog } from '@/state/feedbackSlice'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import { FC } from 'react'

const ManageDatabase: FC = () => {
  const dispatch = useAppDispatch()
  return (
    <FluidLayout>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
      >
        Manage Database
      </Typography>
      <Typography
        variant="h2"
        gutterBottom
      >
        Clear Database
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Clearing the database will delete all characters and characterBooks in
        the database. This cannot be undone.
      </Typography>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          dispatch(
            setDialog({
              title: 'Clear database',
              content:
                'Are you sure you want to clear the database? This cannot be undone.',
              actions: [
                {
                  label: 'Cancel',
                  severity: 'inherit'
                },
                {
                  label: 'Clear database',
                  severity: 'success',
                  onClick: () => {
                    deleteDatabase().then(() => {
                      dispatch(
                        setAlert({
                          title: 'Database cleared',
                          message: 'The database has been cleared.',
                          severity: 'success'
                        })
                      )
                    })
                  }
                }
              ]
            })
          )
        }}
      >
        Clear
      </Button>
      <Typography
        variant="h2"
        gutterBottom
      >
        Export Database
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Exporting the database will create a JSON file with all characters and
        characterBooks in the database.
      </Typography>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          exportDatabase()
            .then((blob) => {
              const url = window.URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              link.download = 'database.json'
              link.click()
              window.URL.revokeObjectURL(url)
            })
            .catch((error) => {
              if (error instanceof Error) {
                dispatch(
                  setAlert({
                    title: 'Error exporting database',
                    message: error.message,
                    severity: 'error'
                  })
                )
              } else {
                dispatch(
                  setAlert({
                    title: 'Error exporting database',
                    message:
                      'An unknown error occurred while exporting the database',
                    severity: 'error'
                  })
                )
              }
            })
        }}
      >
        Export
      </Button>
      <Typography
        variant="h2"
        gutterBottom
      >
        Import Database
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Import
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
        <div>
          <Drop
            dropzoneOptions={{
              accept: {
                'application/json': ['.json']
              },
              multiple: false,
              onDropAccepted: (files) => {
                importDatabase(files[0])
                  .then(() => {
                    dispatch(
                      setAlert({
                        title: 'Database imported',
                        message: 'The database has been imported.',
                        severity: 'success'
                      })
                    )
                  })
                  .catch((error) => {
                    if (error instanceof Error) {
                      dispatch(
                        setAlert({
                          title: 'Error importing database',
                          message: error.message,
                          severity: 'error'
                        })
                      )
                    } else {
                      dispatch(
                        setAlert({
                          title: 'Error importing database',
                          message:
                            'An unknown error occurred while importing the database',
                          severity: 'error'
                        })
                      )
                    }
                  })
              }
            }}
          >
            <FontAwesomeIcon
              icon={faFileImport}
              size="3x"
            />
            <Typography
              variant="subtitle1"
              align="center"
              gutterBottom
            >
              Import Database
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
            >
              Drag &amp; drop your database library file here, or click to
              select file
            </Typography>
            <Typography
              variant="caption"
              align="center"
              gutterBottom
            >
              Supported file types: .json
            </Typography>
          </Drop>
        </div>
      </Box>
    </FluidLayout>
  )
}

export default ManageDatabase
