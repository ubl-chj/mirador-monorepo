import { compose } from 'redux';
import { connect } from 'react-redux';
import { getCompantionWindowIds } from '../state/selectors';
import { WindowMiddleContent } from '../components/WindowMiddleContent';

/** */
const mapStateToProps = (state, { window }) => ({
  companionWindowIds: getCompantionWindowIds(state, window.id),
});

const enhance = compose(
  connect(mapStateToProps, null),
);

export default enhance(WindowMiddleContent);
