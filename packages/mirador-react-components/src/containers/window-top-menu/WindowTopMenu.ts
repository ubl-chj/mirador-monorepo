import { WindowTopMenu } from '../../components/window-top-menu/WindowTopMenu';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  containerId: state.config.id,
});

export default connect(mapStateToProps, null)(WindowTopMenu);
