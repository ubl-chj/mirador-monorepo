import {ADD_WINDOW, FOCUS_WINDOW, MAXIMIZE_WINDOW, MINIMIZE_WINDOW,
  REMOVE_WINDOW, SET_WINDOW_SIDE_BAR_PANEL, SET_WINDOW_SIZE, SET_WINDOW_VIEW_TYPE, TOGGLE_WINDOW_SIDE_BAR,
  UPDATE_COMPANION_WINDOW, UPDATE_WINDOW, UPDATE_WINDOW_POSITION,
  addWindow, focusWindow, maximizeWindow, minimizeWindow, removeWindow, setCompanionAreaOpen,
  setWindowSideBarPanel, setWindowSize, setWindowThumbnailPosition, setWindowViewType, toggleWindowSideBar,
  updateWindow, updateWindowPosition} from '../../actions';

describe('window actions', () => {
  describe('focusWindow', () => {
    it('should return correct action object with pan=true', () => {
      const expectedAction = {
        position: { x: 25, y: -13 },
        type: FOCUS_WINDOW,
        windowId: 'window',
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
      const thunk = focusWindow('window', true);

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0].shift();
      expect(action).toEqual(expectedAction);
    });
    it('should return correct action object with pan=false', () => {
      const expectedAction = {
        position: {},
        type: FOCUS_WINDOW,
        windowId: 'window',
      };

      const mockState = {
        companionWindows: {},
        windows: {
          window: { x: 50, y: 12 },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = focusWindow('window');

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
        type: ADD_WINDOW,
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
      };

      const mockState = {
        windows: { a: {}, b: {} },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = addWindow(options);

      thunk(mockDispatch, mockGetState);

      const action: any = mockDispatch.mock.calls[0].shift();

      expect(action).toMatchObject(expectedAction);
      expect(action.window.companionWindowIds.length).toEqual(2);
      expect(action.window.companionWindowIds[0]).toEqual(action.companionWindows[0].id);
      expect(action.window.companionWindowIds[1]).toEqual(action.window.thumbnailNavigationId);
      expect(action.window.companionWindowIds[1]).toEqual(action.companionWindows[1].id);
    });
  });

  describe('updateWindow', () => {
    it('should return correct action object', () => {
      const payload = {
        bar: 2,
        foo: 1,
      };
      const action = updateWindow('window-123', payload);
      expect(action.type).toBe(UPDATE_WINDOW);
      expect(action.id).toBe('window-123');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('removeWindow', () => {
    it('removes the window and returns windowId', () => {
      const id = 'abc123';
      const expectedAction = {
        companionWindowIds: ['a', 'b', 'c'],
        type: REMOVE_WINDOW,
        windowId: id,
      };
      const mockState = {
        companionWindows: {},
        windows: {
          abc123: { companionWindowIds: ['a', 'b', 'c'] },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = removeWindow(id);

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0].shift();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('maximizeWindow', () => {
    it('maximizes the window', () => {
      const maxWindowId = 'abc123';
      const maximizeWindowAction = {
        type: MAXIMIZE_WINDOW,
        windowId: maxWindowId,
      };
      expect(maximizeWindow(maxWindowId)).toEqual(maximizeWindowAction);
    });
  });

  describe('minimizeWindow', () => {
    it('minimizes the window and renders current layout', () => {
      const minWindowId = 'abc123';
      const minimizeWindowAction = {
        type: MINIMIZE_WINDOW,
        windowId: minWindowId,
      };
      expect(minimizeWindow(minWindowId)).toEqual(minimizeWindowAction);
    });
  });

  describe('toggleWindowSideBar', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: TOGGLE_WINDOW_SIDE_BAR,
        windowId: id,
      };
      expect(toggleWindowSideBar(id)).toEqual(expectedAction);
    });
  });

  describe('setCompanionAreaOpen', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        id,
        payload: { companionAreaOpen: true },
        type: UPDATE_WINDOW,
      };
      expect(setCompanionAreaOpen(id, true)).toEqual(expectedAction);
    });
  });


  describe('setWindowThumbnailPosition', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';

      const expectedAction = {
        id,
        payload: { position: 'right' },
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
        type: SET_WINDOW_VIEW_TYPE,
        viewType: 'book',
        windowId: id,
      };
      expect(setWindowViewType(id, 'book')).toEqual(expectedAction);
    });
  });

  describe('setWindowSideBarPanel', () => {
    it('returns the appropriate action type', () => {
      const windowId = 'abc123';
      const panelType = 'panelType';
      const expectedAction = {
        panelType,
        type: SET_WINDOW_SIDE_BAR_PANEL,
        windowId,
      };
      expect(setWindowSideBarPanel(windowId, 'panelType')).toEqual(expectedAction);
    });
  });

  describe('setWindowSize', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
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

      expect(setWindowSize(id, {
        height: 200,
        width: 200,
        x: 20,
        y: 20,
      })).toEqual(expectedAction);
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
      expect(updateWindowPosition(id, {
        x: 20,
        y: 20,
      })).toEqual(expectedAction);
    });
  });
});
