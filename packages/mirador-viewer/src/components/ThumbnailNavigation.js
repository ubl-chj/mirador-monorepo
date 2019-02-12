import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import Grid from 'react-virtualized/dist/commonjs/Grid';
import CanvasThumbnail from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import ns from '../config/css-ns';
import 'react-virtualized/styles.css';

/**
 */
class ThumbnailNavigation extends Component {
  /**
   */
  constructor(props) {
    super(props);

    this.cellRenderer = this.cellRenderer.bind(this);
    this.calculateScaledWidth = this.calculateScaledWidth.bind(this);
  }

  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  currentCanvasClass(canvasIndex) {
    const { window } = this.props;
    if (window.canvasIndex === canvasIndex) return 'current-canvas';
    return '';
  }

  /**
   * Renders a given "cell" for a react-virtualized Grid. Right now this is a
   * "canvas" but in the future for paged items, would be connected canvases.
   * https://github.com/bvaughn/react-virtualized/blob/master/docs/Grid.md
   */
  cellRenderer(options) {
    const {
      columnIndex, key, style,
    } = options;
    const {
      window, setCanvas, config, canvases,
    } = this.props;
    const canvas = canvases[columnIndex];
    return (
      <div
        key={key}
        style={style}
        className={ns('thumbnail-nav-container')}
      >
        <div
          onClick={() => setCanvas(window.id, canvas.index)}
          onKeyPress={() => setCanvas(window.id, canvas.index)}
          role="presentation"
          style={{
            width: style.width - 8,
          }}
          className={ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${canvas.index}`, this.currentCanvasClass(canvas.index)])}
        >
          <CanvasThumbnail
            imageUrl={new ManifestoCanvas(canvas).thumbnail(config.thumbnailNavigation.height)}
            height={config.thumbnailNavigation.height}
          />
        </div>
      </div>
    );
  }

  /**
   * calculateScaledWidth - calculates the scaled width of a column for a Grid
   * in this simple case, a column == canvas.
   */
  calculateScaledWidth(options) {
    const { config, canvases } = this.props;
    const canvas = new ManifestoCanvas(canvases[options.index]);
    return Math.floor(config.thumbnailNavigation.height * canvas.aspectRatio) + 8;
  }

  /**
   * Renders things
   */
  render() {
    const { config, window, canvases } = this.props;
    if (window.thumbnailNavigationPosition === 'off') {
      return <></>;
    }
    return (
      <div
        className={ns('thumb-navigation')}
        style={{ height: `${config.thumbnailNavigation.height}px` }}
      >
        <AutoSizer
          defaultHeight={100}
          defaultWidth={400}
        >
          {({ height, width }) => (
            <Grid
              cellRenderer={this.cellRenderer}
              columnCount={canvases.length}
              columnIndex={window.canvasIndex}
              columnWidth={this.calculateScaledWidth}
              height={config.thumbnailNavigation.height}
              rowCount={1}
              rowHeight={config.thumbnailNavigation.height}
              scrollToAlignment="center"
              scrollToColumn={window.canvasIndex}
              width={width}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}

ThumbnailNavigation.propTypes = {
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  window: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default ThumbnailNavigation;
