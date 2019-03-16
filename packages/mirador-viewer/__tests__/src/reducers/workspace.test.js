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
      type: ActionTypes.FOCUS_WINDOW,
      windowId: 'abc123',
      position: { x: 10, y: 50 },
    })).toEqual({
      focusedWindowId: 'abc123',
      viewportPosition: { x: 10, y: 50 },
    });
  });
  it('should handle SET_WORKSPACE_FULLSCREEN', () => {
    expect(workspaceReducer([], {
      type: ActionTypes.SET_WORKSPACE_FULLSCREEN,
      isFullscreenEnabled: true,
    })).toEqual({
      isFullscreenEnabled: true,
    });
  });
  it('should handle TOGGLE_ZOOM_CONTROLS', () => {
    expect(workspaceReducer([], {
      type: ActionTypes.TOGGLE_ZOOM_CONTROLS,
      showZoomControls: true,
    })).toEqual({
      showZoomControls: true,
    });
  });
  it('should handle UPDATE_WORKSPACE_MOSAIC_LAYOUT', () => {
    expect(workspaceReducer([], {
      type: ActionTypes.UPDATE_WORKSPACE_MOSAIC_LAYOUT,
      layout: { foo: 'bar' },
    })).toEqual({
      layout: { foo: 'bar' },
    });
  });
  it('should handle SET_WORKSPACE_ADD_VISIBILITY', () => {
    expect(workspaceReducer([], {
      type: ActionTypes.SET_WORKSPACE_ADD_VISIBILITY,
      isWorkspaceAddVisible: true,
    })).toEqual({
      isWorkspaceAddVisible: true,
    });
  });
  it('should handle SET_WORKSPACE_VIEWPORT_POSITION', () => {
    expect(workspaceReducer([], {
      type: ActionTypes.SET_WORKSPACE_VIEWPORT_POSITION,
      payload: {
        position: {
          x: 50,
          y: 50,
          width: 50,
          height: 50,
        },
      },
    })).toEqual({
      viewportPosition: {
        x: 50,
        y: 50,
        width: 50,
        height: 50,
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
