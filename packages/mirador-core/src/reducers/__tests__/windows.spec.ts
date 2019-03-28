import {
  SET_CANVAS, SET_WINDOW_SIZE, UPDATE_WINDOW_POSITION, deselectAnnotation, maximizeWindow,
  minimizeWindow, selectAnnotation, setWindowViewType, toggleAnnotationDisplay, toggleWindowSideBar, setWindowSideBarPanel
} from '../../actions'
import {createAction} from 'typesafe-actions';
import {windowsReducer} from '../';

describe('windows reducer', () => {
  it('should handle MAXIMIZE_WINDOW', () => {
    const before = {
      abc123: { maximized: false },
      abc321: { maximized: false },
    };
    const after = {
      abc123: { maximized: true },
      abc321: { maximized: false },
    };

    expect(windowsReducer(before, maximizeWindow('abc123'))).toEqual(after);
  });
  it('should handle MINIMIZE_WINDOW', () => {
    const before = {
      abc123: { maximized: true },
      abc321: { maximized: false },
    };
    const after = {
      abc123: { maximized: false },
      abc321: { maximized: false },
    };

    expect(windowsReducer(before, minimizeWindow('abc123'))).toEqual(after);
  });
  it('should handle TOGGLE_WINDOW_SIDE_BAR by toggling the sideBarOpen attribute', () => {
    const before = {
      abc123: { sideBarOpen: true },
      abc321: { sideBarOpen: false },
    };
    const after = {
      abc123: { sideBarOpen: false },
      abc321: { sideBarOpen: false },
    };

    expect(windowsReducer(before, toggleWindowSideBar('abc123'))).toEqual(after);
  });

  it('should handle SET_WINDOW_VIEW_TYPE by changing the view attribute', () => {
    const before = {
      abc123: { view: 'single' },
      abc321: { view: 'book' },
    };
    const after = {
      abc123: { view: 'book' },
      abc321: { view: 'book' },
    };

    expect(windowsReducer(before, setWindowViewType('book', 'abc123'))).toEqual(after);
  });

  describe('SET_WINDOW_SIDE_BAR_PANEL', () => {
    it('sets the sideBarPanel value to the given value when it was changed', () => {
      const before = {
        abc123: { sideBarPanel: 'closed' },
        abc321: { sideBarPanel: 'closed' },
      };
      const after = {
        abc123: { sideBarPanel: 'info' },
        abc321: { sideBarPanel: 'closed' },
      };

      expect(windowsReducer(before, setWindowSideBarPanel('info', 'abc123'))).toEqual(after);
    });
  });

  it('should handle SET_CANVAS', () => {
    expect(windowsReducer({
      abc123: {
        canvasIndex: 1,
        id: 'abc123',
      },
      def456: {
        canvasIndex: 1,
        id: 'def456',
      },
    }, {
      payload: {
        canvasIndex: 5,
        windowId: 'abc123',
      },
      type: SET_CANVAS,
    })).toEqual({
      abc123: {
        canvasIndex: 5,
        id: 'abc123',
      },
      def456: {
        canvasIndex: 1,
        id: 'def456',
      },
    });
  });

  it('should handle SET_WINDOW_SIZE', () => {
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
      },
      def456: {
        id: 'def456',
      },
    }, {
      payload: {
        size: {
          height: 200,
          width: 200,
          x: 20,
          y: 20,
        },
        windowId: 'abc123',
      },
      type: SET_WINDOW_SIZE,
    })).toEqual({
      abc123: {
        height: 200,
        id: 'abc123',
        width: 200,
        x: 20,
        y: 20,
      },
      def456: {
        id: 'def456',
      },
    });
  });

  it('should handle UPDATE_WINDOW_POSITION', () => {
    expect(windowsReducer({
      abc123: {
        id: 'abc123',
      },
      def456: {
        id: 'def456',
      },
    }, {
      payload: {
        position: {
          x: 20,
          y: 20,
        },
        windowId: 'abc123',
      },
      type: UPDATE_WINDOW_POSITION,
    })).toEqual({
      abc123: {
        id: 'abc123',
        x: 20,
        y: 20,
      },
      def456: {
        id: 'def456',
      },
    });
  });

  describe('SELECT_ANNOTATION', () => {
    it('handles when no selectedAnnotations exist', () => {
      const beforeState = { abc123: {} };
      const expectedState = {
        abc123: { selectedAnnotations: { cId: ['aId'] } },
      };

      expect(windowsReducer(beforeState, selectAnnotation('aId', 'cId', 'abc123'))).toEqual(expectedState);
    });

    it('adds new annotation IDs to existing canvas IDs', () => {
      const beforeState = { abc123: { selectedAnnotations: { cId: ['prevId'] } } };
      const expectedState = {
        abc123: { selectedAnnotations: { cId: ['prevId', 'aId'] } },
      };

      expect(windowsReducer(beforeState, selectAnnotation('aId', 'cId', 'abc123'))).toEqual(expectedState);
    });

    describe('DESELECT_ANNOTATION', () => {
      it('remvoves the given annotation Id', () => {
        const beforeState = { abc123: { selectedAnnotations: { cId: ['aId1', 'aId2'] } } };
        const expectedState = {
          abc123: { selectedAnnotations: { cId: ['aId2'] } },
        };

        expect(windowsReducer(beforeState, deselectAnnotation('aId1', 'cId', 'abc123'))).toEqual(expectedState);
      });

      it('remvoves the given canvas Id from the selected annotations if there are no more IDs', () => {
        const beforeState = { abc123: { selectedAnnotations: { cId1: ['aId1'], cId2: ['aId2'] } } };
        const expectedState = {
          abc123: { selectedAnnotations: { cId1: ['aId1'] } },
        };

        expect(windowsReducer(beforeState, deselectAnnotation('aId2', 'cId2', 'abc123'))).toEqual(expectedState);
      });
    });

    it('handles TOGGLE_ANNOTATION_DISPLAY by toggling the given window\'s displayAllAnnotation value', () => {
      const beforeState = { abc123: { displayAllAnnotations: false } };
      const expectedState = {
        abc123: { displayAllAnnotations: true },
      };

      expect(windowsReducer(beforeState, toggleAnnotationDisplay('abc123'))).toEqual(expectedState);
    });
  });
});
