import {ActionTypes, addWindow, maximizeWindow, minimizeWindow, removeWindow, setCompanionAreaOpen,
  setWindowSideBarPanel, setWindowSize, setWindowThumbnailPosition, setWindowViewType, toggleWindowSideBar,
  updateWindow, updateWindowPosition} from '@mirador/core';

describe('window actions', () => {
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
          companionWindowIds: [],
          manifestId: null,
          maximized: false,
          rangeId: null,
          thumbnailNavigationPosition: 'bottom',
          x: 2700,
          y: 2700,
          width: 400,
          height: 400,
          rotation: null,
          view: 'single',
        },
      };
      expect(addWindow(options)).toEqual(expectedAction);
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
      };
      expect(removeWindow(id)).toEqual(expectedAction);
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
        type: ActionTypes.SET_WINDOW_THUMBNAIL_POSITION,
        windowId: id,
        position: 'right',
      };
      expect(setWindowThumbnailPosition(id, 'right')).toEqual(expectedAction);
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
