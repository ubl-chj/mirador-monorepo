import React, {ReactElement} from 'react';
import CompanionWindow from '../containers/CompanionWindow';
import LabelValueMetadata from '../containers/LabelValueMetadata'
import { SanitizedHtml } from './SanitizedHtml';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';

interface IWindowSideBarInfoPanel {
  canvasDescription: string
  canvasLabel: string
  canvasMetadata: any
  manifestDescription: string
  manifestMetadata: any
  windowId: string
  id: string
  classes: any
  t: any
}
/**
 * WindowSideBarInfoPanel
 */
export const WindowSideBarInfoPanel: React.FC<IWindowSideBarInfoPanel> = (props): ReactElement => {
  const {canvasDescription, canvasLabel, canvasMetadata, manifestDescription, manifestMetadata, windowId, id, classes, t} = props;

  return (
    <CompanionWindow id={id} paperClassName={ns('window-sidebar-info-panel')} title={t('aboutThisItem')} windowId={windowId} >
      <div className={classes.section}>
        {canvasLabel && (
          <>
            <Typography id={`${id}-currentItem`} variant="overline" >{t('currentItem')}</Typography>
            <Typography aria-labelledby={`${id}-currentItem`} variant="h4">
              {canvasLabel}
            </Typography>
          </>
        )}

        {canvasDescription && (
          <Typography variant="body1">
            <SanitizedHtml htmlString={canvasDescription} ruleSet="iiif" />
          </Typography>
        )}

        {canvasMetadata && canvasMetadata.length > 0 && (
          <LabelValueMetadata labelValuePairs={canvasMetadata} />
        )}
      </div>

      <div className={classes.section}>
        {manifestDescription && (
          <Typography variant="body1">
            <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
          </Typography>
        )}
        {manifestMetadata && manifestMetadata.length > 0 && (
          <LabelValueMetadata labelValuePairs={manifestMetadata} />
        )}
      </div>
    </CompanionWindow>
  );
}

