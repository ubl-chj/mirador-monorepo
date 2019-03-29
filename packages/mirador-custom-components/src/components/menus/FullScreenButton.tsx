import React, {ReactElement} from 'react';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp'
import FullscreenIcon from '@material-ui/icons/FullscreenSharp'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import {useTranslation} from 'react-i18next'

interface IFullScreenButton {
  isFullscreenEnabled: boolean,
  setWorkspaceFullscreen: Function,
}

export const FullScreenButton: React.FC<IFullScreenButton> = (props): ReactElement => {
  const {isFullscreenEnabled, setWorkspaceFullscreen} = props
  const {t} = useTranslation()
  return (
    <ListItem
      button={true}
      style={{justifyContent: 'center'}}
    >
      <IconButton
        aria-label={isFullscreenEnabled ? t('exitFullScreen') : t('workspaceFullScreen')}
        href=''
        onClick={() => setWorkspaceFullscreen(!isFullscreenEnabled)}
      >
        {isFullscreenEnabled ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </ListItem>
  )
}


