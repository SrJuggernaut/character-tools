import Drop from '@/components/ui/Drop'
import useAppDispatch from '@/hooks/useAppDispatch'
import { exportCharacterCollection } from '@/services/character'
import {
  deleteAllCharacterBooks,
  importCharacterBookCollection
} from '@/services/characterBooks'
import { setAlert, setDialog } from '@/state/feedbackSlice'
import { faFileImport } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import { type FC } from 'react'

const ManageLibrary: FC = () => {
  const dispatch = useAppDispatch()
  return (
    <div>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
      >
        Manage Character Library
      </Typography>
      <Typography
        variant="h2"
        gutterBottom
      >
        Clear Library
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Clearing the library will delete all characterBooks in the library. This
        cannot be undone.
      </Typography>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          dispatch(
            setDialog({
              title: 'Clear library',
              content:
                'Are you sure you want to clear the characterBook library? This cannot be undone.',
              actions: [
                {
                  label: 'Cancel',
                  severity: 'inherit'
                },
                {
                  label: 'Clear library',
                  severity: 'success',
                  onClick: () => {
                    deleteAllCharacterBooks()
                      .then(() => {
                        dispatch(
                          setAlert({
                            title: 'Library cleared',
                            severity: 'success',
                            message: 'The library was successfully cleared'
                          })
                        )
                      })
                      .catch((error) => {
                        if (error instanceof Error) {
                          dispatch(
                            setAlert({
                              title: 'Error while clearing library',
                              severity: 'error',
                              message: error.message
                            })
                          )
                        } else {
                          dispatch(
                            setAlert({
                              title: 'Error while clearing library',
                              severity: 'error',
                              message:
                                'An unknown error occurred while clearing the library'
                            })
                          )
                        }
                      })
                  }
                }
              ]
            })
          )
        }}
      >
        Clear Library
      </Button>
      <Typography
        variant="h2"
        gutterBottom
      >
        Export Library
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Exporting the library will download a JSON file containing all
        characters in the library.
      </Typography>
      <Button
        type="button"
        variant="contained"
        onClick={() => {
          exportCharacterCollection()
            .then((data) => {
              const blob = new Blob([JSON.stringify(data)], {
                type: 'application/json'
              })
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.download = 'characterLibrary.json'
              link.href = url
              link.click()
            })
            .catch((error) => {
              if (error instanceof Error) {
                dispatch(
                  setAlert({
                    title: 'Error while exporting library',
                    severity: 'error',
                    message: error.message
                  })
                )
              } else {
                dispatch(
                  setAlert({
                    title: 'Error while exporting library',
                    severity: 'error',
                    message:
                      'An unknown error occurred while exporting the library'
                  })
                )
              }
            })
        }}
      >
        Export Library
      </Button>
      <Typography
        variant="h2"
        gutterBottom
      >
        Import Library
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
      >
        Importing the library will add all characters in the imported file to
        the library.
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
                importCharacterBookCollection(files[0])
                  .then(() => {
                    dispatch(
                      setAlert({
                        title: 'Library imported',
                        severity: 'success',
                        message: 'The library was successfully imported'
                      })
                    )
                  })
                  .catch((error) => {
                    if (error instanceof Error) {
                      dispatch(
                        setAlert({
                          title: 'Error while importing library',
                          severity: 'error',
                          message: error.message
                        })
                      )
                    } else {
                      dispatch(
                        setAlert({
                          title: 'Error while importing library',
                          severity: 'error',
                          message:
                            'An unknown error occurred while importing the library'
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
              Import character library
            </Typography>
            <Typography
              variant="body1"
              align="center"
              gutterBottom
            >
              Importing the library will add all characters in the imported file
              to the library.
            </Typography>
            <Typography
              variant="caption"
              align="center"
              gutterBottom
            >
              Supported formats: JSON
            </Typography>
          </Drop>
        </div>
        <div></div>
      </Box>
    </div>
  )
}
export default ManageLibrary
