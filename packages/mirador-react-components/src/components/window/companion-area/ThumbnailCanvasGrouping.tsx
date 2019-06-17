import React, {ReactElement} from 'react';
import {CaptionedCanvasThumbnail} from './CaptionedCanvasThumbnail';
import classNames from 'classnames';
import {makeStyles} from "@material-ui/styles"
import ns from '../../../config/css-ns';

interface IThumbnailCanvasGrouping {
  data: any
  index: number
  setCanvas: Function
  style: any
  window: any
}

const useStyles = makeStyles(theme => ({
  canvas: {
    '&$currentCanvas': {
      border: `2px solid ${(theme as any).palette.secondary.contrastText}`,
    },
    border: '2px solid transparent',
    boxSizing: 'border-box',
    color: (theme as any).palette.common.white,
    cursor: 'pointer',
  },
  currentCanvas: {
  },
}));

export const ThumbnailCanvasGrouping: React.FC<IThumbnailCanvasGrouping> = (props): ReactElement => {
  const classes = useStyles({})
  const {index, style, data, setCanvas, window} = props;
  const {canvasGroupings, position, height} = data;
  const currentGroupings = canvasGroupings.groupings()[index];
  const SPACING = 8;

  const handleSetCanvas = (e) => {
    setCanvas({canvasIndex: parseInt(e.currentTarget.dataset.canvasIndex, 10), windowId: window.id});
  }

  /**
   * Determines whether the current index is the rendered canvas, providing
   * a useful class.
   */
  const currentCanvasClass = (canvasIndices) => {
    if (canvasIndices.includes(index)) return 'current-canvas-grouping';
    return '';
  }


  return (
    <div
      className={ns('thumbnail-nav-container')}
      style={{
        ...style,
        boxSizing: 'content-box',
        height: (Number.isInteger(style.height)) ? style.height - SPACING : null,
        left: style.left + SPACING,
        top: style.top + SPACING,
        width: (Number.isInteger(style.width)) ? style.width - SPACING : null,
      }}
    >
      <div
        className={classNames(
          ns(['thumbnail-nav-canvas', `thumbnail-nav-canvas-${index}`, currentCanvasClass(currentGroupings.map(canvas => canvas.index))]),
          classes.canvas,
          {
            [classes.currentCanvas]: currentGroupings
              .map(canvas => canvas.index).includes(window.canvasIndex),
          },
        )}
        data-canvas-index={currentGroupings[0].index}
        onClick={handleSetCanvas}
        onKeyUp={handleSetCanvas}
        role="button"
        style={{
          display: 'inline-block',
          height: (position === 'far-right') ? 'auto' : `${height - SPACING}px`,
          whiteSpace: 'nowrap',
          width: (position === 'far-bottom') ? 'auto' : `${style.width}px`,
        }}
        tabIndex={-1}
      >
        {currentGroupings.map((canvas) => (
          <CaptionedCanvasThumbnail
            canvas={canvas}
            height={(position === 'far-right') ? style.height - (1.5 * SPACING) : height - (1.5 * SPACING)}
            key={canvas.id}
          />
        ))}
      </div>
    </div>
  );
}

