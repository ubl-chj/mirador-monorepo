import { CompanionWindowFactory } from '../../../components/window/companion-area/CompanionWindowFactory';
import { connect } from 'react-redux';

const mapStateToProps = (state, { id }) => {
  const companionWindow = state.companionWindows[id];
  return {
    ...companionWindow,
    isDisplayed: companionWindow
                  && companionWindow.content
                  && companionWindow.content.length > 0,
  };
};

export default connect(mapStateToProps)(CompanionWindowFactory) as any;
