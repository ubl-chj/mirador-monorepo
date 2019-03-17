import {Dispatch, bindActionCreators} from 'redux'
import {focusWindow, setWorkspaceAddVisibility, setWorkspaceFullscreen, updateConfig} from '@mirador/core'
import {WorkspaceControlPanelComponent} from '../components'
import {connect} from 'react-redux'

const getLanguagesFromConfigWithCurrent = (state): any => {
  const {availableLanguages} = state.config;
  return Object.keys(availableLanguages).map(key => ({
    label: availableLanguages[key],
    locale: key,
  }));
}

const getTitles = (manifests): [] => {
  const manifestations = Object.keys(manifests).reduce((acc, key) => {
    return [...acc, manifests[key].manifestation]
  }, [])
  return manifestations.reduce((acc, val) => {
    return [...acc, val.getLabel().map(label => label.value)[0]]
  }, [])
}

const mapStateToProps = (state): any => (
  {
    currentLanguage: state.config.language,
    discovery: state.config.discovery,
    focusedWindowId: state.workspace.focusedWindowId,
    isFullscreenEnabled: state.workspace.isFullscreenEnabled,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    languages: getLanguagesFromConfigWithCurrent(state),
    manifests: state.manifests,
    theme: state.config.theme,
    windows: state.windows,
    workspaceType: state.config.workspace.type
  }
)



const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators({focusWindow, setWorkspaceAddVisibility, setWorkspaceFullscreen, updateConfig}, dispatch)

export const WorkspaceControlPanel = connect(mapStateToProps, mapDispatchToProps)(WorkspaceControlPanelComponent)
