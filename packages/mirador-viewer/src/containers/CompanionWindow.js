import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { CompanionWindow } from '../components/CompanionWindow';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id, windowId }) => {
  const companionWindow = state.companionWindows[id];

  return {
    ...companionWindow,
    isDisplayed: (companionWindow
                  && companionWindow.content
                  && companionWindow.content.length > 0),
  };
};

/**
 * mapDispatchToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapDispatchToProps = (dispatch, { windowId, id }) => ({
  onCloseClick: () => dispatch(
    actions.removeCompanionWindow(windowId, id),
  ),
  updateCompanionWindow: (...args) => dispatch(actions.updateCompanionWindow(...args)),
});

/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */
const styles = theme => ({
  windowSideBarTitle: {
    ...theme.typography.subtitle1,
    flexGrow: 1,
  },
  root: {
    display: 'flex',
    minHeight: 0,
    boxShadow: 'none',
    flexDirection: 'column',
    boxSizing: 'border-box',
  },
  horizontal: {
    height: '201px',
    width: '100%',
  },
  vertical: {
    width: theme.paper.width,
  },
  'companionWindow-left': {

  },
  'companionWindow-right': {
    borderLeft: '0.5px solid rgba(0, 0, 0, 0.12)',
  },
  'companionWindow-bottom': {
    borderTop: '0.5px solid rgba(0, 0, 0, 0.12)',
  },
  positionButton: {
    order: -100,
  },
  toolbar: {
    minHeight: 'max-content',
  },
  leftPadding: {
    paddingLeft: theme.spacing.unit * 2,
  },
  content: {
    overflowY: 'auto',
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CompanionWindow);
