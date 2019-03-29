import {
  setWorkspaceAddVisibility,
  setWorkspaceFullscreen,
  setWorkspaceViewportPosition,
  toggleWorkspaceExposeMode,
  toggleZoomControls,
  updateWorkspaceMosaicLayout
} from '../../actions'
import {IWorkspace} from "mirador-core-model"
import {workspaceReducer} from '../';


const initialState: IWorkspace = {
  exposeModeOn: false,
  height: 500,
  isFullscreenEnabled: false,
  isWorkspaceAddVisible: true,
  layout: {
    direction: null,
    first: null,
    second: null
  },
  showZoomControls: false,
  viewportPosition: {
    x: 0,
    y: 0,
  },
  width: 500
}

describe('workspace reducer', () => {
  it('should handle SET_WORKSPACE_FULLSCREEN', () => {
    expect(workspaceReducer(initialState, setWorkspaceFullscreen({isFullscreenEnabled: true}))).toEqual({
      exposeModeOn: false,
      height: 500,
      isFullscreenEnabled: true,
      isWorkspaceAddVisible: true,
      layout: {
        direction: null,
        first: null,
        second: null
      },
      showZoomControls: false,
      viewportPosition: {
        x: 0,
        y: 0,
      },
      width: 500
    });
  });
  it('should handle TOGGLE_ZOOM_CONTROLS', () => {
    expect(workspaceReducer(initialState, toggleZoomControls({showZoomControls: true}))).toEqual({
      exposeModeOn: false,
      height: 500,
      isFullscreenEnabled: false,
      isWorkspaceAddVisible: true,
      layout: {
        direction: null,
        first: null,
        second: null
      },
      showZoomControls: true,
      viewportPosition: {
        x: 0,
        y: 0,
      },
      width: 500
    });
  });
  it('should handle UPDATE_WORKSPACE_MOSAIC_LAYOUT', () => {
    expect(workspaceReducer(initialState, updateWorkspaceMosaicLayout({layout: {foo: 'bar'}}))).toEqual({
      exposeModeOn: false,
      height: 500,
      isFullscreenEnabled: false,
      isWorkspaceAddVisible: true,
      layout: {
        foo: 'bar',
      },
      showZoomControls: false,
      viewportPosition: {
        x: 0,
        y: 0,
      },
      width: 500
    });
  });
  it('should handle SET_WORKSPACE_ADD_VISIBILITY', () => {
    expect(workspaceReducer(initialState, setWorkspaceAddVisibility({isWorkspaceAddVisible: true}))).toEqual({
      exposeModeOn: false,
      height: 500,
      isFullscreenEnabled: false,
      isWorkspaceAddVisible: true,
      layout: {
        direction: null,
        first: null,
        second: null
      },
      showZoomControls: false,
      viewportPosition: {
        x: 0,
        y: 0,
      },
      width: 500
    });
  });
  it('should handle SET_WORKSPACE_VIEWPORT_POSITION', () => {
    expect(workspaceReducer(initialState, setWorkspaceViewportPosition({position: {x: 50, y: 50}}))).toEqual({
      exposeModeOn: false,
      height: 500,
      isFullscreenEnabled: false,
      isWorkspaceAddVisible: true,
      layout: {
        direction: null,
        first: null,
        second: null
      },
      showZoomControls: false,
      viewportPosition: {
        x: 50,
        y: 50,
      },
      width: 500
    });
  });
  it('should handle TOGGLE_WORKSPACE_EXPOSE_MODE', () => {
    expect(workspaceReducer(initialState, toggleWorkspaceExposeMode({exposeModeOn: true}))).toEqual({
      exposeModeOn: true,
      height: 500,
      isFullscreenEnabled: false,
      isWorkspaceAddVisible: true,
      layout: {
        direction: null,
        first: null,
        second: null
      },
      showZoomControls: false,
      viewportPosition: {
        x: 0,
        y: 0,
      },
      width: 500
    });
  });
});
