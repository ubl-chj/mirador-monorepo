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
const mapDispatchToProps = {
  onCloseClick: actions.closeCompanionWindow,
  updateCompanionWindow: actions.updateCompanionWindow,
};

/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */
const styles = theme => ({
  content: {
    ...theme.mixins.gutters(),
    overflowY: 'auto',
  },
  horizontal: {
    height: '200px',
    width: '100%',
  },
  leftPadding: {
    ...theme.mixins.gutters(),
    paddingRight: 0,
  },
  positionButton: {
    order: -100,
  },
  root: {
    display: 'flex',
    minHeight: 0,
    boxShadow: 'none',
    flexDirection: 'column',
  },
  vertical: {
    width: theme.paper.width,
  },
  windowSideBarTitle: {
    ...theme.typography.subtitle1,
    flexGrow: 1,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(CompanionWindow);
