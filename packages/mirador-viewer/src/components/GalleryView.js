import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import { getCanvasLabel } from '@mirador/core';
import { CanvasThumbnail } from './CanvasThumbnail';
import ns from '../config/css-ns';


/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class GalleryView extends Component {
  /**
   * container classes
   */
  containerClasses(currentCanvas) {
    const { window } = this.props;
    const currentClass = (currentCanvas === window.canvasIndex) ? 'current-canvas' : '';
    return `${ns('gallery-view-item')} ${currentClass}`;
  }

  /**
   * Renders things
   */
  render() {
    const { window, canvases, setCanvas } = this.props;
    console.log(canvases)
    return (
      <>
        <section
          className={ns('gallery-container')}
          id={`${window.id}-gallery`}
        >
          {
            canvases.map((canvas) => {
              const manifestoCanvas = new ManifestoCanvas(canvas);
              return (
                <div
                  key={canvas.index}
                  className={this.containerClasses(canvas.index)}
                  onClick={() => setCanvas(window.id, canvas.index)}
                  onKeyUp={() => setCanvas(window.id, canvas.index)}
                  role="button"
                  tabIndex={0}
                >
                  <CanvasThumbnail
                    imageUrl={manifestoCanvas.thumbnail(null, 100)}
                    isValid={manifestoCanvas.hasValidDimensions}
                    maxHeight={120}
                    maxWidth={100}
                    aspectRatio={manifestoCanvas.aspectRatio}
                  />
                  <Typography variant='caption'>
                    {getCanvasLabel(canvas, canvas.index)}
                  </Typography>
                </div>
              );
            })
          }
        </section>
      </>
    );
  }
}

GalleryView.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
};
