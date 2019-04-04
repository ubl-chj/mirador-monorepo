import { WorkspaceMosaic } from '../components/WorkspaceMosaic';
import { connect } from 'react-redux';
import {updateWorkspaceMosaicLayout} from '@mirador/core';

const mapStateToProps = state => (
  {
    workspace: state.workspace,
  }
);

const mapDispatchToProps = { updateWorkspaceMosaicLayout };

export default connect(mapStateToProps, mapDispatchToProps)(WorkspaceMosaic);
