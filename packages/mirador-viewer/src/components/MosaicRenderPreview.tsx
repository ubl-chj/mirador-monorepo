import React, {ReactElement} from 'react';
import classNames from 'classnames';

interface IMosaicRenderPreview {
  classes: any
  t: any
  title: string
}
/**
 * MosaicRenderPreview is used to for the preview when dragging a mosaic window/tile
*/
export const MosaicRenderPreview: React.FC<IMosaicRenderPreview> = (props): ReactElement => {
  const {
    classes, t, title,
  } = props;

  return (
    <div className={classNames('mosaic-window-body', classes.preview)}>
      {t('previewWindowTitle', { title })}
    </div>
  );
}

