import {removeCompanionWindow, updateCompanionWindow} from '@mirador/core';
import { CompanionWindow } from '../components';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

/**
 * mapStateToProps - to hook up connect
 * @memberof CompanionWindow
 * @private
 */
const mapStateToProps = (state, { id }) => {
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
const mapDispatchToProps = {removeCompanionWindow, updateCompanionWindow}

/**
 *
 * @param theme
 * @returns {{closeButton: {top: number, position: string, right: number},
 * root: {overflowY: string, width: string}}}
 */
const styles: any = theme => ({
  'companionWindow-bottom': {
    borderTop: '0.5px solid rgba(0, 0, 0, 0.12)',
  },
  'companionWindow-left': {

  },
  'companionWindow-right': {
    borderLeft: '0.5px solid rgba(0, 0, 0, 0.12)',
  },

  content: {
    overflowY: 'auto',
  },
  horizontal: {
    height: '201px',
    width: '100%',
  },
  leftPadding: {
    paddingLeft: theme.spacing.unit * 2,
  },
  positionButton: {
    order: -100,
  },
  root: {
    boxShadow: 'none',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  },
  toolbar: {
    minHeight: 'max-content',
  },
  vertical: {
    width: '300px',
  },
  windowSideBarTitle: {
    ...theme.typography.subtitle1,
    flexGrow: 1,
  },
});

const enhance: any = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('CompanionWindow'),
);

export default enhance(CompanionWindow);
