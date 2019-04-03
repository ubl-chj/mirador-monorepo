import { WindowTopMenu } from '../components/WindowTopMenu';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 * @memberof WindowTopMenu
 * @private
 */
const mapStateToProps = state => ({
  containerId: state.config.id,
});

const enhance: any = compose(
  connect(mapStateToProps, null),
);

export default enhance(WindowTopMenu);
