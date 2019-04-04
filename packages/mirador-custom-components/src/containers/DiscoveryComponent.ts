import {evalAddWindows, fetchManifestWorker, setWorkspaceAddVisibility} from '@mirador/core'
import {DiscoveryComponent} from '../components'
import {connect} from 'react-redux'

const mapStateToProps = (state): any => (
  {
    discovery: state.config.discovery,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    manifests: state.manifests,
  }
)

const mapDispatchToProps = {evalAddWindows, fetchManifestWorker, setWorkspaceAddVisibility}
export const DiscoveryContainer = connect(mapStateToProps, mapDispatchToProps)(DiscoveryComponent)
