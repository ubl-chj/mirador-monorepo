import React, {ReactElement} from 'react';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp'
import FullscreenIcon from '@material-ui/icons/FullscreenSharp'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import {setWorkspaceFullscreen} from "@mirador/core"
import {useDispatch} from 'react-redux'
import {useTranslation} from 'react-i18next'

interface IFullScreenButton {
  enabled: boolean,
  setWorkspaceFullscreen: Function,
}

export const FullScreenButton: React.FC<IFullScreenButton> = (props): ReactElement => {
  const {enabled} = props
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(setWorkspaceFullscreen({enabled: !enabled}))
  }

  return (
    <ListItem
      button={true}
      component='li'
      style={{justifyContent: 'center'}}
    >
      <IconButton
        aria-label={enabled ? t('exitFullScreen') : t('workspaceFullScreen')}
        href=''
        onClick={handleClick}
      >
        {enabled ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </ListItem>
  )
}


