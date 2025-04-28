import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { updateCharacterEditor } from '@/state/characterEditorSlice'
import replaceChar from '@/utilities/character/replaceChar'
import replaceName from '@/utilities/character/replaceName'
import {
  faCode,
  faLeftLong,
  faRightLong,
  faScrewdriverWrench,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(() => ({
  tooltips: {
    width: 'max-content',
    maxWidth: '50vw',
    fontSize: '1rem'
  }
}))

const ToolbarDial = () => {
  const characterEditorState = useAppSelector((state) => state.characterEditor)
  const dispatch = useAppDispatch()

  const classes = useStyles()
  return (
    <SpeedDial
      ariaLabel="Character Data Toolbar"
      sx={{ position: 'fixed', bottom: 72 + 16, right: 16 }}
      FabProps={{ size: 'large' }}
      icon={
        <FontAwesomeIcon
          icon={faScrewdriverWrench}
          size="xl"
        />
      }
    >
      <SpeedDialAction
        classes={{ staticTooltipLabel: classes.tooltips }}
        tooltipTitle="Replace Name to {{char}}"
        tooltipOpen
        FabProps={{ size: 'medium' }}
        icon={
          <>
            <FontAwesomeIcon
              icon={faUser}
              size="sm"
              fixedWidth
            />
            <FontAwesomeIcon
              icon={faRightLong}
              size="sm"
              fixedWidth
            />
            <FontAwesomeIcon
              icon={faCode}
              size="sm"
              fixedWidth
            />
          </>
        }
        onClick={() => {
          const newEditorState = replaceName(characterEditorState)
          dispatch(updateCharacterEditor(newEditorState))
        }}
      />
      <SpeedDialAction
        classes={{ staticTooltipLabel: classes.tooltips }}
        tooltipTitle="Replace {{char}} to Name"
        tooltipOpen
        FabProps={{ size: 'medium' }}
        icon={
          <>
            <FontAwesomeIcon
              icon={faUser}
              size="sm"
              fixedWidth
            />
            <FontAwesomeIcon
              icon={faLeftLong}
              size="sm"
              fixedWidth
            />
            <FontAwesomeIcon
              icon={faCode}
              size="sm"
              fixedWidth
            />
          </>
        }
        onClick={() => {
          const newEditorState = replaceChar(characterEditorState)
          dispatch(updateCharacterEditor(newEditorState))
        }}
      />
    </SpeedDial>
  )
}

export default ToolbarDial
