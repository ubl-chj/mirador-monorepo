import { App } from '../components/App';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setWorkspaceFullscreen } from '@mirador/core';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof App
 * @private
 */
const mapStateToProps = state => (
  {
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    language: state.config.language,
    theme: state.config.theme,
    translations: state.config.translations,
  }
);

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof App
 * @private
 */
const mapDispatchToProps = {
  setWorkspaceFullscreen
};

const enhance: any = compose(
  connect(mapStateToProps, mapDispatchToProps),
);

export default enhance(App);
