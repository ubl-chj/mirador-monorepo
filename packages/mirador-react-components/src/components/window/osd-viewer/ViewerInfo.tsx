import React, {ReactElement} from 'react';
import Typography from '@material-ui/core/Typography';
import ns from '../../../config/css-ns';
import {useTranslation} from "react-i18next"

interface IViewerInfo {
  canvasCount: number
  canvasIndex: number
  canvasLabel: string
}

export const ViewerInfo: React.FC<any> = (props): ReactElement => {
  const {t} = useTranslation()
  const {canvasCount, canvasIndex, canvasLabel} = props;

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

