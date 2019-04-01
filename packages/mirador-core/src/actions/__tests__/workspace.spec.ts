import {
  SET_WORKSPACE_ADD_VISIBILITY,
  SET_WORKSPACE_FULLSCREEN,
  SET_WORKSPACE_VIEWPORT_DIMENSIONS,
  SET_WORKSPACE_VIEWPORT_POSITION,
  TOGGLE_WORKSPACE_EXPOSE_MODE,
  TOGGLE_ZOOM_CONTROLS,
  UPDATE_WORKSPACE_MOSAIC_LAYOUT,
  setWorkspaceAddVisibility,
  setWorkspaceFullscreen,
  setWorkspaceViewportDimensions,
  setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode,
  toggleZoomControls,
  updateWorkspaceMosaicLayout
} from '../../actions';

describe('workspace actions', () => {
  describe('setWorkspaceFullscreen', () => {
    it('should return correct action type if set to true', () => {
      const receivedAction = setWorkspaceFullscreen({isFullscreenEnabled: true});
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          isFullscreenEnabled: true
        },
        type: SET_WORKSPACE_FULLSCREEN,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
    it('should return correct action type if set to false', () => {
      const receivedAction = setWorkspaceFullscreen({isFullscreenEnabled: false});
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          isFullscreenEnabled: false
        },
        type: SET_WORKSPACE_FULLSCREEN,
      };
      expect(receivedAction).toEqual(expectedAction);
    });
  });
  describe('updateWorkspaceMosaicLayout', () => {
    it('should updates mosaic layout', () => {
      const options = { foo: 'bar' };

      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          layout: {foo: 'bar'},
        },
        type: UPDATE_WORKSPACE_MOSAIC_LAYOUT,
      };
      expect(updateWorkspaceMosaicLayout({layout: options})).toEqual(expectedAction);
    });
  });
  describe('toggleZoomControls', () => {
    it('should set the zoom control visibility', () => {
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          showZoomControls: true,
        },
        type: TOGGLE_ZOOM_CONTROLS,
      };
      expect(toggleZoomControls({showZoomControls: true})).toEqual(expectedAction);
    });
  });
  describe('setWorkspaceAddVisibility', () => {
    it('should set the workspace add visibility', () => {
      const expectedAction = {
        payload: {
          isWorkspaceAddVisible: true,
        },
        type: SET_WORKSPACE_ADD_VISIBILITY,
      };
      expect(setWorkspaceAddVisibility({isWorkspaceAddVisible: true})).toEqual(expectedAction);
    });
  });
  describe('setWorkspaceViewportDimensions', () => {
    it('should set the workspace add visibility', () => {
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          position: {
            height: 25,
            width: 20,
          },
        },
        type: SET_WORKSPACE_VIEWPORT_DIMENSIONS,
      };
      expect(setWorkspaceViewportDimensions({position: {height: 25, width: 20}})).toEqual(expectedAction);
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
        type: SET_WORKSPACE_VIEWPORT_POSITION,
      };
      expect(setWorkspaceViewportPosition({position: {x: 20, y: 20}})).toEqual(expectedAction);
    });
  });
  describe('toggleWorkspaceExposeMode', () => {
    it('should set the exposeMode to true', () => {
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          exposeModeOn: false
        },
        type: TOGGLE_WORKSPACE_EXPOSE_MODE,
      };
      expect(toggleWorkspaceExposeMode({exposeModeOn: false})).toEqual(expectedAction);
    });
  });
});
