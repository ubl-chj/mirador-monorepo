import { App } from '../components/App';
import { connect } from 'react-redux';
import { setWorkspaceFullscreen } from '@mirador/core';

const mapStateToProps = state => (
  {
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    language: state.config.language,
    theme: state.config.theme,
    translations: state.config.translations,
  }
);

const mapDispatchToProps = {
  setWorkspaceFullscreen
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
