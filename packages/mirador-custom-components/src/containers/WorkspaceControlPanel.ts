import {setWorkspaceAddVisibility, updateConfig} from '@mirador/core'
import {connect} from 'react-redux'
import {bindActionCreators, compose, Dispatch} from 'redux'
import {WorkspaceControlPanelComponent} from '../components'
import { withTranslation } from 'react-i18next'

const mapStateToProps = (state: any) => (
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

const getLanguagesFromConfigWithCurrent = (state) => {
  const { availableLanguages, language } = state.config;
  return Object.keys(availableLanguages).map(key => ({
    locale: key,
    label: availableLanguages[key],
  }));
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({updateConfig, setWorkspaceAddVisibility}, dispatch)

export const WorkspaceControlPanel = compose<any>(
  withTranslation(),
  connect(mapStateToProps, mapDispatchToProps)
)(WorkspaceControlPanelComponent)
