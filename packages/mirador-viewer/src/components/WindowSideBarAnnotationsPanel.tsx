import React, {ReactElement} from 'react';
import AnnotationSettings from '../containers/AnnotationSettings';
import CompanionWindow from '../containers/CompanionWindow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { SanitizedHtml } from './SanitizedHtml';
import Typography from '@material-ui/core/Typography';
import ns from '../config/css-ns';

interface IWindowSideBarAnnotationsPanel {
  annotations: any,
  classes: any
  deselectAnnotation: Function
  id: string
  selectAnnotation: Function
  selectedAnnotationIds: string[]
  t: Function
  windowId: string
}
/**
 * WindowSideBarAnnotationsPanel ~
*/
export const WindowSideBarAnnotationsPanel: React.FC<IWindowSideBarAnnotationsPanel> = (props): ReactElement => {
  const {annotations, classes, deselectAnnotation, id, windowId, selectAnnotation, selectedAnnotationIds, t} = props;
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

