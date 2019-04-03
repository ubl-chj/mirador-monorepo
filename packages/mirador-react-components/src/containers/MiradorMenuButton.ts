import { MiradorMenuButton } from '../components/MiradorMenuButton';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withPlugins } from '../extend';

/** */
const mapStateToProps = state => ({
  containerId: state.config.id,
});

const enhance: any = compose(
  connect(mapStateToProps, null),
);

export default enhance(MiradorMenuButton);
