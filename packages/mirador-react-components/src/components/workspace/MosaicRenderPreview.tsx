import React, {ReactElement} from 'react';
import classNames from 'classnames';
import {makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"

interface IMosaicRenderPreview {
  title: string
}

const useStyles = makeStyles(theme => ({
  preview: {
    ...(theme as any).typography.h4,
  },
}));

/**
 * MosaicRenderPreview is used to for the preview when dragging a mosaic window/tile
*/
export const MosaicRenderPreview: React.FC<IMosaicRenderPreview> = (props): ReactElement => {
  const classes = useStyles({})
  const {t} = useTranslation()
  const {title} = props;

  return (
    <div className={classNames('mosaic-window-body', classes.preview)}>
      {t('previewWindowTitle', { title })}
    </div>
  );
}

