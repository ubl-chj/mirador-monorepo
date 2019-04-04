import React, {ReactElement} from 'react';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../utils/ManifestoCanvas';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import {makeStyles} from "@material-ui/styles"

interface IGalleryView {
  canvases: {}[]
  classes: any
  setCanvas: any
  window: any
}

const useStyles = makeStyles(theme => ({
  currentCanvas: {
    border: `2px solid ${theme.palette.secondary.main}`,
    padding: theme.spacing(0.5),
  },
  galleryContainer: {
    flex: '1',
    overflowX: 'hidden',
    overflowY: 'scroll',
    padding: '50px 0 50px 20px',
  },
  galleryViewItem: {
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      border: `2px solid ${theme.palette.secondary.main}`,
      padding: theme.spacing(0.5),
      transform: 'scale(1.05)',
      transition: '.1s transform ease-out',
    },
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'inline-block',
    height: '160px',
    margin: `${theme.spacing(1)}px ${theme.spacing(0.5)}px`,
    maxWidth: '100px',
    overflow: 'hidden',
    padding: theme.spacing(0.5),
    textOverflow: 'elipsis',
    transition: '.1s transform ease-out',
  },
}));

/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export const GalleryView: React.FC<IGalleryView> = (props): ReactElement => {
  const classes = useStyles()
  const {canvases, setCanvas, window} = props;
  return (
    <>
      <section
        className={classes.galleryContainer}
        id={`${window.id}-gallery`}
      >
        {
          canvases.map((canvas: any) => {
            const manifestoCanvas = new ManifestoCanvas(canvas);
            return (
              <div
                className={
                  classNames(
                    classes.galleryViewItem,
                    canvas.index === window.canvasIndex ? classes.currentCanvas : '',
                  )
                }
                key={canvas.index}
                onClick={() => setCanvas({canvasIndex: canvas.index, windowId: window.id})}
                onKeyUp={() => setCanvas({canvasIndex: canvas.index, windowId: window.id, })}
                role="button"
                tabIndex={0}
              >
                <CanvasThumbnail
                  aspectRatio={manifestoCanvas.aspectRatio}
                  imageUrl={manifestoCanvas.thumbnail(null, 100)}
                  isValid={manifestoCanvas.hasValidDimensions}
                  maxHeight={120}
                  maxWidth={100}
                  style={{ margin: '0 auto' }}
                />
                <Typography variant="caption">
                  {manifestoCanvas.getLabel()}
                </Typography>
              </div>
            );
          })
        }
      </section>
    </>
  );
}

