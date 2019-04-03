import { WindowTopMenuButton } from '../components/WindowTopMenuButton';
import { compose } from 'redux';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core';
import { withTranslation } from 'react-i18next';

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  ctrlBtnSelected: {
    backgroundColor: theme.palette.action.selected,
  },
});

const enhance: any = compose(
  withTranslation(),
  withStyles(styles),
);

export default enhance(WindowTopMenuButton);
