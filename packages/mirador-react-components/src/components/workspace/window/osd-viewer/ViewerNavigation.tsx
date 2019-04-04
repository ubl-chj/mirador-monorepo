import {ArrowLeftIcon, ArrowRightIcon} from '../../../icons';
import React, {ReactElement, useEffect, useState} from 'react';
import MiradorMenuButton from '../../../../containers/MiradorMenuButton';
import ns from '../../../../config/css-ns';
import {useTranslation} from "react-i18next"

interface IViewerNavigation {
  canvases: any
  setCanvas: Function
  window: any
}

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
  const { canvases, window, setCanvas } = props;
  const [keyPressed, setKeyPressed] = useState(false);

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
      setCanvas({canvasIndex: window.canvasIndex + canvasIncrementor(), windowId: window.id});
    }
  }
  const previousCanvas = () => {
    if (hasPreviousCanvas()) {
      setCanvas({canvasIndex: Math.max(0, window.canvasIndex - canvasIncrementor()), windowId: window.id});
    }
  }

  return (
    <div className={ns('osd-navigation')}>
      <MiradorMenuButton
        aria-label={t('previousCanvas')}
        className={ns('previous-canvas-button')}
        disabled={!hasPreviousCanvas()}
        onClick={previousCanvas}
        style={arrowStyle()}
      >
        <ArrowLeftIcon />
      </MiradorMenuButton>
      <MiradorMenuButton
        aria-label={t('nextCanvas')}
        className={ns('next-canvas-button')}
        disabled={!hasNextCanvas()}
        onClick={nextCanvas}
        style={arrowStyle()}
      >
        <ArrowRightIcon />
      </MiradorMenuButton>
    </div>
  );
}
