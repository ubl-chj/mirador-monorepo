import {removeCompanionWindow, updateCompanionWindow} from '@mirador/core';
import { CompanionWindow } from '../../../../components/workspace/window/companion-area/CompanionWindow';
import { connect } from 'react-redux';

const mapStateToProps = (state, { id }) => {
  const companionWindow = state.companionWindows[id];

  return {
    ...companionWindow,
    isDisplayed: (companionWindow
                  && companionWindow.content
                  && companionWindow.content.length > 0),
  };
};

const mapDispatchToProps = {removeCompanionWindow, updateCompanionWindow}

export default connect(mapStateToProps, mapDispatchToProps)(CompanionWindow);
