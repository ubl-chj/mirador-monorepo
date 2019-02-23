import {addWindow, fetchManifest} from '@mirador/core'
import { connect } from 'react-redux'
import { DiscoveryComponent } from '../DiscoveryComponent'

const mapDispatchToProps = {addWindow, fetchManifest}

export default connect(null, mapDispatchToProps)(DiscoveryComponent)
