import * as actions from '@mirador/react-component';
import { connect } from 'react-redux';
import { DiscoveryComponent } from '../DiscoveryComponent';

const mapDispatchToProps = {
  addWindow: actions.addWindow,
  fetchManifest: actions.fetchManifest,
};

export default connect(null, mapDispatchToProps)(DiscoveryComponent);
