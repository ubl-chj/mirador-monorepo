import {ActionTypes, setWorkspaceAddVisibility, setWorkspaceFullscreen, setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode, toggleZoomControls, updateWorkspaceMosaicLayout} from '@mirador/core';

describe('workspace actions', () => {
  describe('setWorkspaceFullscreen', () => {
    it('should return correct action type if set to true', () => {
      const receivedAction = setWorkspaceFullscreen(true);
      const expectedAction = {
        type: ActionTypes.SET_WORKSPACE_FULLSCREEN,
        isFullscreenEnabled: true,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
    it('should return correct action type if set to false', () => {
      const receivedAction = setWorkspaceFullscreen(false);
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
      expect(updateWorkspaceMosaicLayout(options)).toEqual(expectedAction);
    });
  });
  describe('toggleZoomControls', () => {
    it('should set the zoom control visibility', () => {
      const expectedAction = {
        type: ActionTypes.TOGGLE_ZOOM_CONTROLS,
        showZoomControls: true,
      };
      expect(toggleZoomControls(true)).toEqual(expectedAction);
    });
  });
  describe('setWorkspaceAddVisibility', () => {
    it('should set the workspace add visibility', () => {
      const expectedAction = {
        type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY,
        isWorkspaceAddVisible: true,
      };
      expect(setWorkspaceAddVisibility(true)).toEqual(expectedAction);
    });
  });
  describe('setWorkspaceViewportPosition', () => {
    it('should set the workspace add visibility', () => {
      const expectedAction = {
        type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
        payload: {
          position: {
            x: 20,
            y: 20,
          },
        },
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
