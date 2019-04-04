import React, {ReactElement} from 'react';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import NavigationIcon from '@material-ui/icons/PlayCircleOutlineSharp';
import ns from '../config/css-ns';
import {useTranslation} from "react-i18next"

interface IViewerNavigation {
  canvases: any
  setCanvas: Function
  window: any
}

export const ViewerNavigation: React.FC<IViewerNavigation> = (props): ReactElement => {
  const {t} = useTranslation()
  const { canvases, window, setCanvas } = props;
  const hasPreviousCanvas = () => {
    return window.canvasIndex > 0;
  }
  const hasNextCanvas = () => {
    return window.canvasIndex < canvases.length - this.canvasIncrementor();
  }
  const nextCanvas = () => {
    if (hasNextCanvas()) {
      setCanvas(window.id, window.canvasIndex + this.canvasIncrementor());
    }
  }
  const canvasIncrementor = () => {
    if (window.view === 'book') {
      return 2;
    } else {
      return 1;
    }
  }
  const previousCanvas = () => {
    if (hasPreviousCanvas()) {
      setCanvas(window.id, Math.max(0, window.canvasIndex - canvasIncrementor()));
    }
  }

  return (
    <div className={ns('osd-navigation')}>
      <MiradorMenuButton
        aria-label={t('previousCanvas')}
        className={ns('previous-canvas-button')}
        disabled={!hasPreviousCanvas()}
        onClick={previousCanvas}
      >
        <NavigationIcon style={{ transform: 'rotate(180deg)' }} />
      </MiradorMenuButton>
      <MiradorMenuButton
        aria-label={t('nextCanvas')}
        className={ns('next-canvas-button')}
        disabled={!hasNextCanvas()}
        onClick={nextCanvas}
      >
        <NavigationIcon />
      </MiradorMenuButton>
    </div>
  );
}
