import { getWindowViewType, setWindowViewType } from '@mirador/core';
import { WindowViewSettings } from '../../../../components/workspace/window/top-menu/WindowViewSettings';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

const mapDispatchToProps = { setWindowViewType };

const mapStateToProps = (state, { windowId }) => (
  {
    windowViewType: getWindowViewType(state, { windowId }),
  }
);

const styles = theme => ({
  MenuItem: {
    display: 'inline',
  },
  optionLabel: {
    color: theme.palette.text.secondary,
  },
  selectedLabel: {
    color: theme.palette.text.primary,
  },
});

const enhance: any = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(WindowViewSettings);
