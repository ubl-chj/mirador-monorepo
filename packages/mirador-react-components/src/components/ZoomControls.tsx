import React, {ReactElement} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineSharp';
import MiradorMenuButton from '../containers/MiradorMenuButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import {RestoreZoomIcon} from './icons';

interface IZoomControls {
  classes: any
  showZoomControls: boolean
  t: any
  updateViewport: any
  viewer: {
    x: number
    y: number
    zoom: number
  }
  windowId: string
  zoomToWorld: any
}
/**
 */
export const ZoomControls: React.FC<IZoomControls> = (props): ReactElement => {
  const {showZoomControls, classes, t, windowId, updateViewport, viewer, zoomToWorld} = props;

  const handleZoomInClick = () => {
    updateViewport(windowId, {
      x: viewer.x,
      y: viewer.y,
      zoom: viewer.zoom * 2,
    });
  }

  const handleZoomOutClick = () => {
    const { windowId, updateViewport, viewer } = this.props;

    updateViewport(windowId, {
      x: viewer.x,
      y: viewer.y,
      zoom: viewer.zoom / 2,
    });
  }

  if (!showZoomControls) {
    return (
      <>
      </>
    );
  }
  return (
    <div className={classes.zoom_controls}>
      <MiradorMenuButton aria-label={t('zoomIn')} onClick={handleZoomInClick}>
        <AddCircleIcon />
      </MiradorMenuButton>
      <MiradorMenuButton aria-label={t('zoomOut')} onClick={handleZoomOutClick}>
        <RemoveCircleIcon />
      </MiradorMenuButton>
      <MiradorMenuButton aria-label={t('zoomReset')} onClick={() => zoomToWorld(false)}>
        <RestoreZoomIcon />
      </MiradorMenuButton>
    </div>
  );
}
