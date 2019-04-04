import { MiradorMenuButton } from '../components/MiradorMenuButton';
import { connect } from 'react-redux';

/** */
const mapStateToProps = state => ({
  containerId: state.config.id,
});

export default connect(mapStateToProps, null)(MiradorMenuButton);
