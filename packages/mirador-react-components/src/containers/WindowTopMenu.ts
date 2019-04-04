import { WindowTopMenu } from '../components/WindowTopMenu';
import { connect } from 'react-redux';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowTopMenu
 * @private
 */
const mapStateToProps = state => ({
  containerId: state.config.id,
});

export default connect(mapStateToProps, null)(WindowTopMenu);
