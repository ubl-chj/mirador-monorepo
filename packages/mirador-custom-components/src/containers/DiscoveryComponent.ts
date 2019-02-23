import {addWindow, fetchManifest} from '@mirador/core'
import { connect } from 'react-redux'
import { DiscoveryComponent } from '../DiscoveryComponent'

const mapStateToProps = ({ config}) => ({
  config,
})
const mapDispatchToProps = {addWindow, fetchManifest}

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryComponent)
