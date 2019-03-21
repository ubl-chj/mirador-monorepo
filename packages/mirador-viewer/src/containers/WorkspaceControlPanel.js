import { compose } from 'redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { WorkspaceControlPanel } from '../components/WorkspaceControlPanel';
import { withPlugins } from '../extend';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)},
 * drawer: {overflowX: string, height: string}}}
 */
const styles = theme => ({
  ctrlBtn: {
    margin: theme.spacing.unit,
  },
  drawer: {
    overflowX: 'hidden',
  },
  root: {
    [theme.breakpoints.up('sm')]: {
      height: '100%',
      left: 0,
      right: 'auto',
      width: 64,
    },
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  withPlugins('WorkspaceControlPanel'),
);

export default enhance(WorkspaceControlPanel);
