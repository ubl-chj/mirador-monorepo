import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@mirador/core';
import { App } from '../components/App';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    language: state.config.language,
    theme: state.config.theme,
    translations: state.config.translations,
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  setWorkspaceFullscreen: actions.setWorkspaceFullscreen,
};

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('App')
);

export default enhance(App);
