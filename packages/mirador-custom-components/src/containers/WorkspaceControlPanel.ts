import {focusWindowWorker, getWindowTitles, setWorkspaceAddVisibility, setWorkspaceFullscreen, updateConfig} from '@mirador/core'
import {WorkspaceControlPanelComponent} from '../components'
import {connect} from 'react-redux'

const getLanguagesFromConfigWithCurrent = (state): any => {
  const {availableLanguages} = state.config;
  return Object.keys(availableLanguages).map(key => ({
    label: availableLanguages[key],
    locale: key,
  }));
}

const mapStateToProps = (state): any => (
  {
    currentLanguage: state.config.language,
    discovery: state.config.discovery,
    enabled: state.workspace.enabled,
    focusedWindowId: state.workspace.focusedWindowId,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    languages: getLanguagesFromConfigWithCurrent(state),
    manifests: state.manifests,
    theme: state.config.theme,
    titles: getWindowTitles(state),
    windows: state.windows,
    workspaceType: state.config.workspace.type
  }
)

const mapDispatchToProps = {focusWindowWorker, setWorkspaceAddVisibility, setWorkspaceFullscreen, updateConfig}

export const WorkspaceControlPanel = connect(mapStateToProps, mapDispatchToProps)(WorkspaceControlPanelComponent)
