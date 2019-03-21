import {ActionTypes, setWorkspaceAddVisibility, setWorkspaceFullscreen, setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode, toggleZoomControls, updateWorkspaceMosaicLayout} from '@mirador/core';

describe('workspace actions', () => {
  describe('setWorkspaceFullscreen', () => {
    it('should return correct action type if set to true', () => {
      const receivedAction = setWorkspaceFullscreen(true);
      const expectedAction = {
        isFullscreenEnabled: true,
        type: ActionTypes.SET_WORKSPACE_FULLSCREEN,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
    it('should return correct action type if set to false', () => {
      const receivedAction = setWorkspaceFullscreen(false);
      const expectedAction = {
        isFullscreenEnabled: false,
        type: ActionTypes.SET_WORKSPACE_FULLSCREEN,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('updateWorkspaceMosaicLayout', () => {
    it('should updates mosaic layout', () => {
      const options = { foo: 'bar' };

      const expectedAction = {
        layout: { foo: 'bar' },
        type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT,
      };
      expect(updateWorkspaceMosaicLayout(options)).toEqual(expectedAction);
    });
  });
  describe('toggleZoomControls', () => {
    it('should set the zoom control visibility', () => {
      const expectedAction = {
        showZoomControls: true,
        type: ActionTypes.TOGGLE_ZOOM_CONTROLS,
      };
      expect(toggleZoomControls(true)).toEqual(expectedAction);
    });
  });
  describe('setWorkspaceAddVisibility', () => {
    it('should set the workspace add visibility', () => {
      const expectedAction = {
        isWorkspaceAddVisible: true,
        type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY,
      };
      expect(setWorkspaceAddVisibility(true)).toEqual(expectedAction);
    });
  });
  describe('setWorkspaceViewportDimensions', () => {
    it('should set the workspace add visibility', () => {
      const expectedAction = {
        payload: {
          position: {
            height: 25,
            width: 20,
          },
        },
        type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
      };
      expect(actions.setWorkspaceViewportDimensions({
        height: 25,
        width: 20,
      })).toEqual(expectedAction);
    });
  });
  describe('setWorkspaceViewportPosition', () => {
    it('should set the workspace add visibility', () => {
      const expectedAction = {
        payload: {
          position: {
            x: 20,
            y: 20,
          },
        },
        type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
      };
      expect(setWorkspaceViewportPosition({
        x: 20,
        y: 20,
      })).toEqual(expectedAction);
    });
  });
  describe('toggleWorkspaceExposeMode', () => {
    it('should set the exposeMode to true', () => {
      const expectedAction = {
        type: ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE,
      };
      expect(toggleWorkspaceExposeMode()).toEqual(expectedAction);
    });
  });
});
