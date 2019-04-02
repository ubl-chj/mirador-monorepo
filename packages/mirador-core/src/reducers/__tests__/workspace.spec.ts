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
  enabled: false,
  exposeModeOn: false,
  height: 500,
  isWorkspaceAddVisible: false,
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
    expect(workspaceReducer(initialState, setWorkspaceFullscreen({enabled: true}))).toEqual({
      enabled: true,
      exposeModeOn: false,
      height: 500,
      isWorkspaceAddVisible: false,
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
      enabled: false,
      exposeModeOn: false,
      height: 500,
      isWorkspaceAddVisible: false,
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
      enabled: false,
      exposeModeOn: false,
      height: 500,
      isWorkspaceAddVisible: false,
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
      enabled: false,
      exposeModeOn: false,
      height: 500,
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
      enabled: false,
      exposeModeOn: false,
      height: 500,
      isWorkspaceAddVisible: false,
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
      enabled: false,
      exposeModeOn: true,
      height: 500,
      isWorkspaceAddVisible: false,
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
