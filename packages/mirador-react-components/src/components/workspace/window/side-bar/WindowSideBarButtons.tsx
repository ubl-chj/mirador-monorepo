import React, {ReactElement} from 'react';
import AnnotationIcon from '@material-ui/icons/CommentSharp';
import Badge from '@material-ui/core/Badge';
import {CanvasIndexIcon} from '../../../icons';
import InfoIcon from '@material-ui/icons/InfoSharp';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"

interface IWindowSideBarButtons {
  addCompanionWindow: Function
  hasAnnotations: boolean
  id: string
  sideBarPanel: string
}

const useStyles = makeStyles(theme => ({
  tab: {
    '&:active': {
      backgroundColor: theme.palette.action.active,
    },
    '&:hover': {
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      backgroundColor: theme.palette.action.hover,
      textDecoration: 'none',
      // Reset on touch devices, it doesn't add specificity
    },
    borderRight: '2px solid transparent',
    minWidth: 'auto',
  },
  tabRipple: {
    backgroundColor: theme.palette.action.active,
  },
  tabSelected: {
    '&:hover': {
      backgroundColor: theme.palette.tabSelected.main,
    },
    backgroundColor: theme.palette.tabSelected.main,
    borderRight: `2px solid ${theme.palette.focused.main}`,
  },
  tabsFlexContainer: {
    flexDirection: 'column',
  },
  tabsIndicator: {
    display: 'none',
  },
}));

export const WindowSideBarButtons: React.FC<IWindowSideBarButtons> = (props): ReactElement => {
  const classes = useStyles()
  const {t} = useTranslation()
  const { addCompanionWindow, hasAnnotations, sideBarPanel } = props;

  const handleChange = ({}, value) => { //eslint-disable-line
    addCompanionWindow({content: value, position: 'left'});
  }

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

