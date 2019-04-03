import React, {ReactElement} from 'react';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../utils/ManifestoCanvas';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

interface IGalleryView {
  canvases: {}[]
  classes: any
  setCanvas: any
  window: any
}
/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export const GalleryView: React.FC<IGalleryView> = (props): ReactElement => {
  const {canvases, classes, setCanvas, window} = props;
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
                onClick={() => setCanvas(window.id, canvas.index)}
                onKeyUp={() => setCanvas(window.id, canvas.index)}
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

