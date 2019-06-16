import React, {ReactElement} from 'react';
import FullscreenExitIcon from '@material-ui/icons/FullscreenExitSharp'
import FullscreenIcon from '@material-ui/icons/FullscreenSharp'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import {useTranslation} from 'react-i18next'

interface IFullScreenButton {
  enabled: boolean,
  setWorkspaceFullscreen: Function,
}

export const FullScreenButton: React.FC<IFullScreenButton> = (props): ReactElement => {
  const {enabled, setWorkspaceFullscreen} = props
  const {t} = useTranslation()

  return (
    <ListItem
      button={true}
      component='li'
      style={{justifyContent: 'center'}}
    >
      <IconButton
        aria-label={enabled ? t('exitFullScreen') : t('workspaceFullScreen')}
        href=''
        onClick={(): void => setWorkspaceFullscreen({enabled: !enabled})}
      >
        {enabled ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
    </ListItem>
  )
}


