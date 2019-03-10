import {addWindow, fetchManifest, setWorkspaceAddVisibility} from '@mirador/core'
import {DiscoveryComponent} from '../components'
import {connect} from 'react-redux'


const mapStateToProps = (state): any => (
  {
    discovery: state.config.discovery,
    isWorkspaceAddVisible: state.workspace.isWorkspaceAddVisible,
    manifests: state.manifests,
  }
)

const mapDispatchToProps = {addWindow, fetchManifest, setWorkspaceAddVisibility}
export const DiscoveryContainer = connect(mapStateToProps, mapDispatchToProps)(DiscoveryComponent)
