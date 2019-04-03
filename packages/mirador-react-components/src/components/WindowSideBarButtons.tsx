import React, {ReactElement} from 'react';
import AnnotationIcon from '@material-ui/icons/CommentSharp';
import Badge from '@material-ui/core/Badge';
import {CanvasIndexIcon} from './icons';
import InfoIcon from '@material-ui/icons/InfoSharp';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';

interface IWindowSideBarButtons {
  addCompanionWindow: any
  classes: any
  hasAnnotations: boolean
  sideBarPanel: string
  t: any
}
/**
 *
 */
export const WindowSideBarButtons: React.FC<IWindowSideBarButtons> = (props): ReactElement => {
  /** */
  const handleChange = (value) => {
    const { addCompanionWindow, id } = this.props;
    addCompanionWindow({content: value, id, position: 'left'});
  }

  const { classes, hasAnnotations, sideBarPanel, t } = props;
  return (
    <Tabs
      aria-orientation="vertical"
      classes={{ flexContainer: classes.tabsFlexContainer, indicator: classes.tabsIndicator }}
      indicatorColor="secondary"
      onChange={handleChange}
      textColor="secondary"
      value={sideBarPanel === 'closed' ? false : sideBarPanel}
      variant="fullWidth"
    >
      <Tab
        TouchRippleProps={{ classes: { child: classes.tabRipple } }}
        aria-label={
          t('openInfoCompanionWindow')
        }
        classes={{ root: classes.tab, selected: classes.tabSelected }}
        icon={(
          <Tooltip title={t('openInfoCompanionWindow')}>
            <InfoIcon />
          </Tooltip>
        )}
        value="info"
      />
      <Tab
        TouchRippleProps={{ classes: { child: classes.tabRipple } }}
        aria-label={
          t('openCanvasNavigationCompanionWindow')
        }
        classes={{ root: classes.tab, selected: classes.tabSelected }}
        icon={(
          <Tooltip title={t('openCanvasNavigationCompanionWindow')}>
            <CanvasIndexIcon />
          </Tooltip>
        )}
        value="canvas_navigation"
      />
      <Tab
        TouchRippleProps={{ classes: { child: classes.tabRipple } }}
        aria-label={
          t('openAnnotationCompanionWindow')
        }
        classes={{ root: classes.tab, selected: classes.tabSelected }}
        icon={(
          <Tooltip title={t('openAnnotationCompanionWindow')}>
            <Badge color="error" invisible={!hasAnnotations} variant="dot">
              <AnnotationIcon />
            </Badge>
          </Tooltip>
        )}
        value="annotations"
      />
    </Tabs>
  );
}

