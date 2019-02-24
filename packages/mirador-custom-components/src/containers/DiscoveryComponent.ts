import {addWindow, fetchManifest, setWorkspaceAddVisibility} from '@mirador/core'
import {connect} from 'react-redux'
import {DiscoveryComponent} from '../components'

const mapStateToProps = (state) => (
  {
    discovery: state.config.discovery,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
  }
)

const mapDispatchToProps = {addWindow, fetchManifest, setWorkspaceAddVisibility}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryComponent)
