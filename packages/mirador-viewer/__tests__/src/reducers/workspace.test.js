import {ActionTypes, workspaceReducer} from '@mirador/core';

describe('workspace reducer', () => {
  it('should handle FOCUS_WINDOW without position coordinates', () => {
    expect(workspaceReducer([], {
      type: ActionTypes.FOCUS_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      focusedWindowId: 'abc123',
      viewportPosition: {},
    });
  });
  it('should handle FOCUS_WINDOW', () => {
    expect(workspaceReducer([], {
      position: { x: 10, y: 50 },
      type: ActionTypes.FOCUS_WINDOW,
      windowId: 'abc123',
    })).toEqual({
      focusedWindowId: 'abc123',
      viewportPosition: { x: 10, y: 50 },
    });
  });
  it('should handle SET_WORKSPACE_FULLSCREEN', () => {
    expect(workspaceReducer([], {
      isFullscreenEnabled: true,
      type: ActionTypes.SET_WORKSPACE_FULLSCREEN,
    })).toEqual({
      isFullscreenEnabled: true,
    });
  });
  it('should handle TOGGLE_ZOOM_CONTROLS', () => {
    expect(workspaceReducer([], {
      showZoomControls: true,
      type: ActionTypes.TOGGLE_ZOOM_CONTROLS,
    })).toEqual({
      showZoomControls: true,
    });
  });
  it('should handle UPDATE_WORKSPACE_MOSAIC_LAYOUT', () => {
    expect(workspaceReducer([], {
      layout: { foo: 'bar' },
      type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT,
    })).toEqual({
      layout: { foo: 'bar' },
    });
  });
  it('should handle SET_WORKSPACE_ADD_VISIBILITY', () => {
    expect(workspaceReducer([], {
      isWorkspaceAddVisible: true,
      type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY,
    })).toEqual({
      isWorkspaceAddVisible: true,
    });
  });
  it('should handle SET_WORKSPACE_VIEWPORT_POSITION', () => {
    expect(workspaceReducer([], {
      payload: {
        position: {
          height: 50,
          width: 50,
          x: 50,
          y: 50,
        },
      },
      type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
    })).toEqual({
      viewportPosition: {
        height: 50,
        width: 50,
        x: 50,
        y: 50,
      },
    });
  });
  it('should handle TOGGLE_WORKSPACE_EXPOSE_MODE', () => {
    expect(workspaceReducer([], {
      type: ActionTypes.TOGGLE_WORKSPACE_EXPOSE_MODE,
    })).toEqual({
      exposeModeOn: true,
    });
  });
});
