import {addWindow, fetchManifest, setWorkspaceAddVisibility} from '@mirador/core'
import {connect} from 'react-redux'
import {DiscoveryComponent} from '../components'

const mapStateToProps = (state) => (
  {
    discovery: state.config.discovery,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    manifests: state.manifests,
  }
)

const mapDispatchToProps = {addWindow, fetchManifest, setWorkspaceAddVisibility}
export const DiscoveryContainer = connect(mapStateToProps, mapDispatchToProps)(DiscoveryComponent)
