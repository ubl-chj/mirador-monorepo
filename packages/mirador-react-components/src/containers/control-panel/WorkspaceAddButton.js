import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '@mirador/core';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core';
import { WorkspaceAddButton } from '../components/WorkspaceAddButton';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof WorkspaceControlPanel
 * @private
 */
const mapStateToProps = state => (
  {
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof Workspace
 * @private
 */
const mapDispatchToProps = { setWorkspaceAddVisibility: actions.setWorkspaceAddVisibility };

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  fab: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(1),
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      marginTop: theme.spacing(1),
    },

    marginBottom: theme.spacing(0.5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(0.5),
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WorkspaceAddButton'),
);

export default enhance(WorkspaceAddButton);
