import React, {ReactElement} from 'react';
import {MetadataList} from '../../../custom-components'
import { SanitizedHtml } from './SanitizedHtml';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"

interface IWindowSideBarInfoPanel {
  canvasDescription: string
  canvasLabel: string
  canvasMetadata: any
  manifestDescription: string
  manifestMetadata: any
  windowId: string
  id: string
}

const useStyles = makeStyles(theme => ({
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: (theme as any).spacing(1),
    paddingLeft: (theme as any).spacing(2),
    paddingRight: (theme as any).spacing(1),
    paddingTop: (theme as any).spacing(2),
  },
}));

/**
 * WindowSideBarInfoPanel
 */
export const WindowSideBarInfoPanel: React.FC<any> = (props): ReactElement => {
  const classes = useStyles({})
  const {t} = useTranslation()
  const {canvasDescription, canvasLabel, canvasMetadata, manifestDescription, manifestMetadata, id} = props;

  return (
    <>
      <div className={classes.section}>
        {canvasLabel && (
          <>
            <Typography
              id={`${id}-currentItem`}
              variant="overline" >{t('currentItem')}
            </Typography>
            <Typography aria-labelledby={`${id}-currentItem`} variant="h4">
              {canvasLabel}
            </Typography>
          </>
        )}
        {canvasDescription && (
          <Typography variant="body1">
            <SanitizedHtml
              htmlString={canvasDescription}
              ruleSet="iiif"
            />
          </Typography>
        )}
        {canvasMetadata && canvasMetadata.length > 0 && (
          <MetadataList labelValuePairs={canvasMetadata} />
        )}
      </div>
      <div className={classes.section}>
        {manifestDescription && (
          <Typography variant="body1">
            <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
          </Typography>
        )}
        {manifestMetadata && manifestMetadata.length > 0 && (
          <MetadataList labelValuePairs={manifestMetadata} />
        )}
      </div>
      </>
  );
}

