import React, {ReactElement} from 'react';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../../../utils/ManifestoCanvas';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import {makeStyles} from "@material-ui/styles"
import ns from '../../../config/css-ns';

interface ICaptionedCanvasThumbnail {
  canvas: any
  height: number
}

const useStyles = makeStyles({
  canvasThumbLabel: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    bottom: '5px',
    left: '0px',
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
  container: {
    display: 'inline-block',
    height: 'inherit',
    position: 'relative',
  },
  root: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  title: {
    color: '#ffffff',
  },
})

export const CaptionedCanvasThumbnail: React.FC<ICaptionedCanvasThumbnail> = (props): ReactElement => {
  const classes = useStyles({})
  const { canvas, height } = props;
  const manifestoCanvas = new ManifestoCanvas(canvas);
  return (
    <div
      className={classes.container}
      key={canvas.id}
    >
      <CanvasThumbnail
        imageUrl={
          manifestoCanvas.thumbnail(null, 200)
          // TODO: When we make these areas resizable, we should probably not hard code this
        }
        isValid={manifestoCanvas.hasValidDimensions}
        maxHeight={height}
        style={{
          maxWidth: `${Math.ceil(height * manifestoCanvas.aspectRatio)}px`,
        }}
      />
      <div
        className={classNames(ns('canvas-thumb-label'), classes.canvasThumbLabel)}
      >
        <div
          style={{
            margin: '4px',
          }}
        >
          <Typography
            classes={{ root: classes.title }}
            variant="caption"
          >
            {manifestoCanvas.getLabel()}
          </Typography>
        </div>
      </div>
    </div>
  );
}

