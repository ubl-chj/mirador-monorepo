import React, {ReactElement} from 'react';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';

interface IViewerInfo {
  canvasCount: number
  canvasIndex: number
  canvasLabel: string
  t: Function
}
/**
 *
 */
export const ViewerInfo: React.FC<IViewerInfo> = (props): ReactElement => {
  const {canvasCount, canvasIndex, canvasLabel, t} = props;

  return (
    <div className={ns('osd-info')}>
      <Typography className={ns('canvas-count')} variant="caption" >
        {`${canvasIndex + 1} ${t('of')} ${canvasCount}`}
      </Typography>
      <Typography className={ns('canvas-label')} variant="caption" >
        {canvasLabel && ` • ${canvasLabel}`}
      </Typography>
    </div>
  );
}

