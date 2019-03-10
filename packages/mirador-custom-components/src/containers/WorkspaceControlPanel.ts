import {Dispatch, bindActionCreators} from 'redux'
import {setWorkspaceAddVisibility, updateConfig} from '@mirador/core'
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
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    languages: getLanguagesFromConfigWithCurrent(state),
    theme: state.config.theme,
    windows: state.windows,
    workspaceType: state.config.workspace.type
  }
)



const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators({setWorkspaceAddVisibility, updateConfig, }, dispatch)

export const WorkspaceControlPanel = connect(mapStateToProps, mapDispatchToProps)(WorkspaceControlPanelComponent)
