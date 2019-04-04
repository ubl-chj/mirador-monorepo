import { focusWindow, getWindowTitles } from '@mirador/core';
import { WindowList } from '../../components/control-panel/WindowList';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../../extend';
import { withTranslation } from 'react-i18next';

const mapDispatchToProps = {
  focusWindow,
};

const mapStateToProps = state => (
  {
    containerId: state.config.id,
    titles: getWindowTitles(state),
    windows: state.windows,
  }
);

const enhance = compose(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowList'),
);

export default enhance(WindowList);
