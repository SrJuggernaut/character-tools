import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { createCharacter, updateCharacter } from '@/services/character'
import { updateCharacterEditor } from '@/state/characterEditorSlice'
import { setAlert } from '@/state/feedbackSlice'
import { type CharacterDatabaseData } from '@/types/character'
import { Button } from '@mui/material'
import { type FC, useCallback } from 'react'

const SaveCharacter: FC = () => {
  const characterEditor = useAppSelector((theme) => theme.characterEditor)
  const dispatch = useAppDispatch()

  const handleSave = useCallback(async () => {
    if (characterEditor.name === undefined || characterEditor.name === '') {
      dispatch(
        setAlert({
          severity: 'error',
          title: 'Error saving character',
          message: 'Character name is empty'
        })
      )
      return
    }
    if (
      characterEditor.description === undefined ||
      characterEditor.description === ''
    ) {
      dispatch(
        setAlert({
          severity: 'error',
          title: 'Error saving character',
          message: 'Character description is empty'
        })
      )
      return
    }
    const createdCharacter = await createCharacter(characterEditor)
    dispatch(updateCharacterEditor(createdCharacter))
    dispatch(
      setAlert({
        severity: 'success',
        title: 'Character saved',
        message: `Character ${characterEditor.name} saved with id ${createdCharacter.id}`
      })
    )
  }, [])

  const handleUpdate = useCallback(async () => {
    if (characterEditor.id === undefined) {
      dispatch(
        setAlert({
          severity: 'error',
          title: 'Error updating character',
          message: 'Character id is undefined'
        })
      )
      return
    }
    if (characterEditor.name === undefined || characterEditor.name === '') {
      dispatch(
        setAlert({
          severity: 'error',
          title: 'Error updating character',
          message: 'Character name is empty'
        })
      )
      return
    }
    if (
      characterEditor.description === undefined ||
      characterEditor.description === ''
    ) {
      dispatch(
        setAlert({
          severity: 'error',
          title: 'Error updating character',
          message: 'Character description is empty'
        })
      )
      return
    }
    const updatedCharacter = await updateCharacter(
      characterEditor as CharacterDatabaseData
    )
    dispatch(updateCharacterEditor(updatedCharacter))
    dispatch(
      setAlert({
        severity: 'success',
        title: 'Character updated',
        message: `Character ${characterEditor.name} updated`
      })
    )
  }, [])

  return (
    <>
      {characterEditor.id !== undefined && (
        <>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              handleUpdate().catch((error) => {
                if (error instanceof Error) {
                  dispatch(
                    setAlert({
                      severity: 'error',
                      title: 'Error updating character',
                      message: error.message
                    })
                  )
                } else {
                  dispatch(
                    setAlert({
                      severity: 'error',
                      title: 'Error updating character',
                      message: 'Unknown error while updating character'
                    })
                  )
                }
              })
            }}
          >
            Update
          </Button>
          <Button
            type="button"
            variant="contained"
            onClick={() => {
              handleSave().catch((error) => {
                if (error instanceof Error) {
                  dispatch(
                    setAlert({
                      severity: 'error',
                      title: 'Error saving character',
                      message: error.message
                    })
                  )
                } else {
                  dispatch(
                    setAlert({
                      severity: 'error',
                      title: 'Error saving character',
                      message: 'Unknown error while saving character'
                    })
                  )
                }
              })
            }}
          >
            Save as new
          </Button>
        </>
      )}
      {characterEditor.id === undefined && (
        <Button
          type="button"
          variant="contained"
          onClick={() => {
            handleSave().catch((error) => {
              if (error instanceof Error) {
                dispatch(
                  setAlert({
                    severity: 'error',
                    title: 'Error saving character',
                    message: error.message
                  })
                )
              } else {
                dispatch(
                  setAlert({
                    severity: 'error',
                    title: 'Error saving character',
                    message: 'Unknown error while saving character'
                  })
                )
              }
            })
          }}
        >
          Save
        </Button>
      )}
    </>
  )
}

export default SaveCharacter
