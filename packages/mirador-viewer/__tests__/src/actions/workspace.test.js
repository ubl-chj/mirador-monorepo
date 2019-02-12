import * as actions from '../../../src/state/actions';
import ActionTypes from '../../../src/state/actions/action-types';

describe('workspace actions', () => {
  describe('setWorkspaceFullscreen', () => {
    it('should return correct action type if set to true', () => {
      const receivedAction = actions.setWorkspaceFullscreen(true);
      const expectedAction = {
        type: ActionTypes.SET_WORKSPACE_FULLSCREEN,
        isFullscreenEnabled: true,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
    it('should return correct action type if set to false', () => {
      const receivedAction = actions.setWorkspaceFullscreen(false);
      const expectedAction = {
        type: ActionTypes.SET_WORKSPACE_FULLSCREEN,
        isFullscreenEnabled: false,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('updateWorkspaceMosaicLayout', () => {
    it('should updates mosaic layout', () => {
      const options = { foo: 'bar' };

      const expectedAction = {
        type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT,
        layout: { foo: 'bar' },
      };
      expect(actions.updateWorkspaceMosaicLayout(options)).toEqual(expectedAction);
    });
  });
  describe('toggleZoomControls', () => {
    it('should set the zoom control visibility', () => {
      const expectedAction = {
        type: ActionTypes.TOGGLE_ZOOM_CONTROLS,
        showZoomControls: true,
      };
      expect(actions.toggleZoomControls(true)).toEqual(expectedAction);
    });
  });
});
