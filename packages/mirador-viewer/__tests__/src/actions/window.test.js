import {ActionTypes, addWindow, maximizeWindow, minimizeWindow, removeWindow, setCompanionAreaOpen,
  setWindowSideBarPanel, setWindowSize, setWindowThumbnailPosition, setWindowViewType, toggleWindowSideBar,
  updateWindow, updateWindowPosition} from '@mirador/core';

describe('window actions', () => {
  describe('focusWindow', () => {
    it('should return correct action object with pan=true', () => {
      const expectedAction = {
        type: ActionTypes.FOCUS_WINDOW,
        windowId: 'window',
        position: { x: 25, y: -13 },
      };

      const mockState = {
        windows: {
          window: {
            x: 50, y: 12, width: 50, height: 50,
          },
        },
        companionWindows: {},
        workspace: {
          viewportPosition: {
            width: 100,
            height: 100,
          },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = actions.focusWindow('window', true);

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];
      expect(action).toEqual(expectedAction);
    });
    it('should return correct action object with pan=false', () => {
      const expectedAction = {
        type: ActionTypes.FOCUS_WINDOW,
        windowId: 'window',
        position: {},
      };

      const mockState = {
        windows: {
          window: { x: 50, y: 12 },
        },
        companionWindows: {},
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = actions.focusWindow('window');

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];
      expect(action).toEqual(expectedAction);
    });
  });

  describe('addWindow', () => {
    it('should create a new window with merged defaults', () => {
      const options = {
        id: 'helloworld',
        canvasIndex: 1,
      };

      const expectedAction = {
        type: ActionTypes.ADD_WINDOW,
        window: {
          id: 'helloworld',
          canvasIndex: 1,
          collectionIndex: 0,
          manifestId: null,
          maximized: false,
          rangeId: null,
          x: 260,
          y: 300,
          sideBarPanel: 'info',
          width: 400,
          height: 400,
          rotation: null,
          view: 'single',
        },
        companionWindows: [
          { position: 'left', content: 'info' },
          { position: 'far-bottom', content: 'thumbnail_navigation' },
        ],
      };

      const mockState = {
        windows: { a: {}, b: {} },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = actions.addWindow(options);

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];

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
        foo: 1,
        bar: 2,
      };
      const action = updateWindow('window-123', payload);
      expect(action.type).toBe(ActionTypes.UPDATE_WINDOW);
      expect(action.id).toBe('window-123');
      expect(action.payload).toEqual(payload);
    });
  });

  describe('removeWindow', () => {
    it('removes the window and returns windowId', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.REMOVE_WINDOW,
        windowId: id,
        companionWindowIds: ['a', 'b', 'c'],
      };
      const mockState = {
        windows: {
          abc123: { companionWindowIds: ['a', 'b', 'c'] },
        },
        companionWindows: {},
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = actions.removeWindow(id);

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];
      expect(action).toEqual(expectedAction);
    });
  });

  describe('maximizeWindow', () => {
    it('maximizes the window', () => {
      const maxWindowId = 'abc123';
      const maximizeWindowAction = {
        type: ActionTypes.MAXIMIZE_WINDOW,
        windowId: maxWindowId,
      };
      expect(maximizeWindow(maxWindowId)).toEqual(maximizeWindowAction);
    });
  });

  describe('minimizeWindow', () => {
    it('minimizes the window and renders current layout', () => {
      const minWindowId = 'abc123';
      const minimizeWindowAction = {
        type: ActionTypes.MINIMIZE_WINDOW,
        windowId: minWindowId,
      };
      expect(minimizeWindow(minWindowId)).toEqual(minimizeWindowAction);
    });
  });

  describe('toggleWindowSideBar', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.TOGGLE_WINDOW_SIDE_BAR,
        windowId: id,
      };
      expect(toggleWindowSideBar(id)).toEqual(expectedAction);
    });
  });

  describe('setCompanionAreaOpen', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.UPDATE_WINDOW,
        id,
        payload: { companionAreaOpen: true },
      };
      expect(setCompanionAreaOpen(id, true)).toEqual(expectedAction);
    });
  });


  describe('setWindowThumbnailPosition', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';

      const expectedAction = {
        type: ActionTypes.UPDATE_COMPANION_WINDOW,
        id,
        payload: { position: 'right' },
      };

      const mockState = {
        windows: {
          somewindow: { thumbnailNavigationId: id },
        },
      };
<<<<<<< HEAD
      expect(setWindowThumbnailPosition(id, 'right')).toEqual(expectedAction);
=======

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = actions.setWindowThumbnailPosition('somewindow', 'right');

      thunk(mockDispatch, mockGetState);

      const action = mockDispatch.mock.calls[0][0];
      expect(action).toEqual(expectedAction);
>>>>>>> 414f532ac21b7ce3ebf3cd5f765342489a97379b
    });
  });

  describe('setWindowViewType', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_VIEW_TYPE,
        windowId: id,
        viewType: 'book',
      };
      expect(setWindowViewType(id, 'book')).toEqual(expectedAction);
    });
  });

  describe('setWindowSideBarPanel', () => {
    it('returns the appropriate action type', () => {
      const windowId = 'abc123';
      const panelType = 'panelType';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_SIDE_BAR_PANEL,
        windowId,
        panelType,
      };
      expect(setWindowSideBarPanel(windowId, 'panelType')).toEqual(expectedAction);
    });
  });

  describe('setWindowSize', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.SET_WINDOW_SIZE,
        payload: {
          windowId: id,
          size: {
            x: 20,
            y: 20,
            width: 200,
            height: 200,
          },
        },
      };
      expect(setWindowSize(id, {
        x: 20,
        y: 20,
        width: 200,
        height: 200,
      })).toEqual(expectedAction);
    });
  });

  describe('updateWindowPosition', () => {
    it('returns the appropriate action type', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.UPDATE_WINDOW_POSITION,
        payload: {
          windowId: id,
          position: {
            x: 20,
            y: 20,
          },
        },
      };
      expect(updateWindowPosition(id, {
        x: 20,
        y: 20,
      })).toEqual(expectedAction);
    });
  });
});
