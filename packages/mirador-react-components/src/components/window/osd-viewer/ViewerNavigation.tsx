import React, {ReactElement} from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import MiradorMenuButton from '../../../containers/MiradorMenuButton';
import {makeStyles} from "@material-ui/styles"
import ns from '../../../config/css-ns';
import {useKeyPress} from '../../../utils/useKeyPress'
import {useTranslation} from "react-i18next"

interface IViewerNavigation {
  canvases: any
  setCanvas: Function
  visible: boolean
  window: any
}

const useStyles = makeStyles({
  colorPrimary: {
    color: '#FFF',
  }
});

const arrowStyle = () => {
  return {
    background: 'rgba(66,66,66,0.54)',
    borderRadius: '28px',
    cursor: 'pointer',
    height: '56px',
    marginTop: '-28px',
    right: '28px',
    top: '50%',
    width: '56px',
    zIndex: 1000,
  }
}

export const ViewerNavigation: React.FC<IViewerNavigation> = (props): ReactElement => {
  const {t} = useTranslation()
  const { canvases, window, setCanvas, visible } = props;
  const classes = useStyles()

  const hasPreviousCanvas = () => {
    return window.canvasIndex > 0;
  }
  const canvasIncrementor = () => {
    if (window.view === 'book') {
      return 2;
    } else {
      return 1;
    }
  }
  const hasNextCanvas = () => {
    return window.canvasIndex < canvases.length - canvasIncrementor();
  }
  const nextCanvas = () => {
    if (hasNextCanvas()) {
      visible && setCanvas({canvasIndex: window.canvasIndex + canvasIncrementor(), windowId: window.id});
    }
  }

  const previousCanvas = () => {
    if (hasPreviousCanvas()) {
      visible && setCanvas({canvasIndex: Math.max(0, window.canvasIndex - canvasIncrementor()), windowId: window.id});
    }
  }

  return (visible && (
    <div className={ns('osd-navigation')}>
      <MiradorMenuButton
        aria-label={t('previousCanvas')}
        className={ns('previous-canvas-button')}
        classes={{colorPrimary: classes.colorPrimary}}
        color='primary'
        disabled={!hasPreviousCanvas()}
        onClick={previousCanvas}
        style={arrowStyle()}
      >
        <ChevronLeft />
      </MiradorMenuButton>
      <MiradorMenuButton
        aria-label={t('nextCanvas')}
        className={ns('next-canvas-button')}
        classes={{colorPrimary: classes.colorPrimary}}
        color='primary'
        disabled={!hasNextCanvas()}
        onClick={nextCanvas}
        style={arrowStyle()}
      >
        <ChevronRight />
      </MiradorMenuButton>
    </div>)
  );
}
