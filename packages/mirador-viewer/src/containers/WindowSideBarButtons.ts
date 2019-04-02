import {
  addCompanionWindow,
  getAnnotationResourcesByMotivation,
  getCompanionWindowForPosition,
} from '@mirador/core';
import { WindowSideBarButtons } from '../components/WindowSideBarButtons';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof WindowSideButtons
 * @private
 */
const mapDispatchToProps = { addCompanionWindow }


/**
 * mapStateToProps - used to hook up connect to state
 * @memberof WindowSideButtons
 * @private
 */
const mapStateToProps = (state, { windowId }) => ({
  hasAnnotations: getAnnotationResourcesByMotivation(state, { windowId }).length > 0,
  sideBarPanel: (getCompanionWindowForPosition(state, { windowId }) || {}).content,
});

/** */
const style: any = theme => ({
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
});

const enhance: any = compose(
  withTranslation(),
  withStyles(style),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarButtons'),
);

export default enhance(WindowSideBarButtons);
