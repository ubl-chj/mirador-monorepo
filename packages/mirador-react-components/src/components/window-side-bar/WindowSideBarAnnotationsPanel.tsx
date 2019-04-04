import React, {ReactElement} from 'react';
import AnnotationSettings from '../../containers/window-side-bar/AnnotationSettings';
import CompanionWindow from '../../containers/window-side-bar/CompanionWindow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { SanitizedHtml } from '../SanitizedHtml';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from "@material-ui/styles"
import ns from '../../config/css-ns';
import {useTranslation} from "react-i18next"

interface IWindowSideBarAnnotationsPanel {
  annotations: any,
  deselectAnnotation: Function
  id: string
  selectAnnotation: Function
  selectedAnnotationIds: string[]
  windowId: string
}

const useStyles = makeStyles(theme => ({
  section: {
    borderBottom: '.5px solid rgba(0,0,0,0.25)',
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(2),
  },
  selectedAnnotation: {
    backgroundColor: theme.palette.background.default,
  },
}));

/**
 * WindowSideBarAnnotationsPanel ~
*/
export const WindowSideBarAnnotationsPanel: React.FC<IWindowSideBarAnnotationsPanel> = (props): ReactElement => {
  const classes = useStyles()
  const {t} = useTranslation()
  const {annotations, deselectAnnotation, id, windowId, selectAnnotation, selectedAnnotationIds} = props;
  /**
   * Rreturn an array of sanitized annotation data
   */
  const sanitizedAnnotations = () => {
    return (
      <List>
        {
          annotations.map(annotation => (
            <ListItem
              className={
                selectedAnnotationIds.includes(annotation.id)
                  ? classes.selectedAnnotation
                  : null
              }
              component='li'
              key={annotation.id}
              onClick={() => {
                if (selectedAnnotationIds.includes(annotation.id)) {
                  deselectAnnotation(windowId, annotation.targetId, annotation.id);
                } else {
                  selectAnnotation(windowId, annotation.targetId, annotation.id);
                }
              }}
            >
              <Typography variant="body2">
                <SanitizedHtml htmlString={annotation.content} ruleSet="iiif" />
              </Typography>
            </ListItem>
          ))
        }
      </List>
    );
  }
  return (
    <CompanionWindow id={id} paperClassName={ns('window-sidebar-annotation-panel')} title={t('annotations')} windowId={windowId}>
      <AnnotationSettings windowId={windowId} />
      <div className={classes.section}>
        <Typography variant="subtitle2">{t('showingNumAnnotations', { number: annotations.length })}</Typography>
      </div>
      {sanitizedAnnotations()}
    </CompanionWindow>
  );
}

