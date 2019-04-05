import {
  ADD_WINDOW,
  FOCUS_WINDOW,
  MAXIMIZE_WINDOW,
  MINIMIZE_WINDOW,
  SET_WINDOW_SIDE_BAR_PANEL,
  SET_WINDOW_SIZE,
  SET_WINDOW_VIEW_TYPE,
  TOGGLE_WINDOW_SIDE_BAR,
  UPDATE_COMPANION_WINDOW,
  UPDATE_WINDOW,
  UPDATE_WINDOW_POSITION,
  evalAddWindows,
  focusWindowWorker,
  maximizeWindow,
  minimizeWindow,
  removeWindow,
  setCompanionAreaOpen,
  setWindowSideBarPanel,
  setWindowSize,
  setWindowThumbnailPosition,
  setWindowViewType,
  toggleWindowSideBar,
  updateWindow,
  updateWindowPosition
} from '../../actions';

describe('window actions', () => {
  describe('focusWindow', () => {
    it('should return correct action object with pan=true', () => {
      const expectedAction = {
        payload: {
          position: { x: 25, y: -13 },
          windowId: 'window',
        },
        type: FOCUS_WINDOW,
      };

      const mockState = {
        companionWindows: {},
        windows: {
          window: {
            height: 50,
            width: 50,
            x: 50,
            y: 12,
          },
        },
        workspace: {
          viewportPosition: {
            height: 100,
            width: 100,
          },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = focusWindowWorker({pan: true, windowId: 'window'});

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0].shift();
      expect(action).toEqual(expectedAction);
    });
    it('should return correct action object with pan=false', () => {
      const expectedAction = {
        payload: {
          position: {},
          windowId: 'window',
        },
        type: FOCUS_WINDOW,
      };

      const mockState = {
        companionWindows: {},
        windows: {
          window: { x: 50, y: 12 },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = focusWindowWorker({pan: false, windowId: 'window'});

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0].shift();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('addWindow', () => {
    it('should create a new window with merged defaults', () => {
      const options = {
        canvasIndex: 1,
        id: 'helloworld',
      };

      const expectedAction = {
        payload: {
          companionWindows: [
            {
              content: 'info',
              position: 'left',
            },
            {
              content: 'thumbnail_navigation',
              position: 'far-bottom',
            },
          ],
          window: {
            canvasIndex: 1,
            collectionIndex: 0,
            height: 400,
            id: 'helloworld',
            manifestId: null,
            maximized: false,
            rangeId: null,
            rotation: null,
            sideBarPanel: 'info',
            view: 'single',
            width: 400,
            x: 260,
            y: 300,
          },
        },
        type: ADD_WINDOW
      };

      const mockState = {
        windows: { a: {}, b: {} },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = evalAddWindows(options);

      thunk(mockDispatch, mockGetState);

      const action: any = mockDispatch.mock.calls[0].shift();

      expect(action).toMatchObject(expectedAction);
      expect(action.payload.window.companionWindowIds.length).toEqual(2);
      expect(action.payload.window.companionWindowIds[0]).toEqual(action.payload.companionWindows[0].id);
      expect(action.payload.window.companionWindowIds[1]).toEqual(action.payload.window.thumbnailNavigationId);
      expect(action.payload.window.companionWindowIds[1]).toEqual(action.payload.companionWindows[1].id);
    });
  });

  describe('updateWindow', () => {
    it('should return correct action object', () => {
      const expectedAction = {
        payload: {
          id: 'window-123'
        },
        type: UPDATE_WINDOW,
      }
      const id = 'window-123'
      const action = updateWindow({id});
      expect(action).toEqual(expectedAction);
    });
  });

  describe('removeWindow', () => {
    it('removes the window and returns windowId', async () => {
      const windowId = 'abc123';
      const expectedAction = {
        payload: {
          id: windowId,
        },
        type: 'REMOVE_WINDOW',
      };
      expect(removeWindow({id: windowId})).toEqual(expectedAction);
    });
  });

  describe('maximizeWindow', () => {
    it('maximizes the window', () => {
      const maxWindowId = 'abc123';
      const maximizeWindowAction = {
        payload: {
          id: maxWindowId,
        },
        type: MAXIMIZE_WINDOW,
      };
      expect(maximizeWindow({id: maxWindowId})).toEqual(maximizeWindowAction);
    });
  });

  describe('minimizeWindow', () => {
    it('minimizes the window and renders current layout', () => {
      const minWindowId = 'abc123';
      const minimizeWindowAction = {
        payload: {
          id: minWindowId,
        },
        type: MINIMIZE_WINDOW,
      };
      expect(minimizeWindow({id: minWindowId})).toEqual(minimizeWindowAction);
    });
  });

  describe('toggleWindowSideBar', () => {
    it('returns the appropriate action type', () => {
      const windowId = 'abc123';
      const expectedAction = {
        payload: {
          id: windowId,
        },
        type: TOGGLE_WINDOW_SIDE_BAR,
      };
      expect(toggleWindowSideBar({id: windowId})).toEqual(expectedAction);
    });
  });

  describe('setCompanionAreaOpen', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        payload: {
          companionAreaOpen: true,
          id,
        },
        type: 'SET_COMPANION_AREA_OPEN',
      };
      expect(setCompanionAreaOpen({companionAreaOpen: true, id})).toEqual(expectedAction);
    });
  });


  describe('setWindowThumbnailPosition', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        id,
        payload: {
          position: 'right' },
        type: UPDATE_COMPANION_WINDOW,
      };

      const mockState = {
        windows: {
          somewindow: { thumbnailNavigationId: id },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = setWindowThumbnailPosition('somewindow', 'right');

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0].shift();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('setWindowViewType', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          viewType: 'book',
          windowId: id,
        },
        type: SET_WINDOW_VIEW_TYPE,
      };
      expect(setWindowViewType({viewType: 'book', windowId: id})).toEqual(expectedAction);
    });
  });

  describe('setWindowSideBarPanel', () => {
    it('returns the appropriate action type', () => {
      const windowId = 'abc123';
      const panelType = 'panelType';
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          panelType,
          windowId,
        },
        type: SET_WINDOW_SIDE_BAR_PANEL,
      };
      expect(setWindowSideBarPanel({panelType: 'panelType', windowId})).toEqual(expectedAction);
    });
  });

  describe('setWindowSize', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          size: {
            height: 200,
            width: 200,
            x: 20,
            y: 20,
          },
          windowId: id,
        },
        type: SET_WINDOW_SIZE,
      };

      expect(setWindowSize({
        size: {height: 200, width: 200, x: 20, y: 20}, windowId: id})).toEqual(expectedAction);
    });
  });

  describe('updateWindowPosition', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        payload: {
          position: {
            x: 20,
            y: 20,
          },
          windowId: id,
        },
        type: UPDATE_WINDOW_POSITION,
      };
      expect(updateWindowPosition({position: {x: 20, y: 20}, windowId: id})).toEqual(expectedAction);
    });
  });
});
