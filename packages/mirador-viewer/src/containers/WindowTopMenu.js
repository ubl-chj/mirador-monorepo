import { compose } from 'redux';
import { connect } from 'react-redux';
import { WindowTopMenu } from '../components/WindowTopMenu';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowTopMenu
 * @private
 */
const mapStateToProps = state => ({
  containerId: state.config.id,
});

const enhance = compose(
  connect(mapStateToProps, null),
);

export default enhance(WindowTopMenu);
