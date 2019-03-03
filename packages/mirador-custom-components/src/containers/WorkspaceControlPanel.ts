import {setWorkspaceAddVisibility, updateConfig} from '@mirador/core'
import {connect} from 'react-redux'
import {WorkspaceControlPanelComponent} from '../components'

const mapStateToProps = (state) => (
  {
    discovery: state.config.discovery,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    theme: state.config.theme,
    windows: state.windows,
  }
)

const mapDispatchToProps = { updateConfig, setWorkspaceAddVisibility }

export const WorkspaceControlPanel = connect(mapStateToProps, mapDispatchToProps)(WorkspaceControlPanelComponent)
