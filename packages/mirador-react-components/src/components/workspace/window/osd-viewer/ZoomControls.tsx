import React, {ReactElement} from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircleOutlineSharp';
import MiradorMenuButton from '../../../../containers/MiradorMenuButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircleOutlineSharp';
import {RestoreZoomIcon} from '../../../icons';
import {makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"

interface IZoomControls {
  showZoomControls: boolean
  updateViewport: any
  viewer: {
    x: number
    y: number
    zoom: number
  }
  windowId: string
  zoomToWorld: any
}

const useStyles = makeStyles({
  ListItem: {
    paddingBottom: 0,
    paddingTop: 0,
  },
  zoom_controls: {
    display: 'flex',
    flexDirection: 'row',
  },
});

/**
 */
export const ZoomControls: React.FC<IZoomControls> = (props): ReactElement => {
  const classes = useStyles()
  const {t} = useTranslation()
  const {showZoomControls, windowId, updateViewport, viewer, zoomToWorld} = props;

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
