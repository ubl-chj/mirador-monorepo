import {
  deselectAnnotation,
  maximizeWindow,
  minimizeWindow, removeWindow,
  selectAnnotation,
  setCanvas,
  setWindowSideBarPanel,
  setWindowSize,
  setWindowViewType,
  toggleAnnotationDisplay,
  toggleWindowSideBar,
  updateWindowPosition
} from '../../actions'
import {windowsReducer} from '../';

describe('windows reducer', () => {
  it('should handle REMOVE_WINDOW', () => {
    expect(windowsReducer({
      abc123: {
        foo: 'bar',
      },
      def456: {
        foo: 'bar',
      },
    }, removeWindow({id: 'abc123'}))).toEqual({
      def456: {
        foo: 'bar',
      },
    });
  });
  it('should handle MAXIMIZE_WINDOW', () => {
    const before = {
      abc123: { maximized: false },
      abc321: { maximized: false },
    };
    const after = {
      abc123: { maximized: true },
      abc321: { maximized: false },
    };

    expect(windowsReducer(before, maximizeWindow({id: 'abc123'}))).toEqual(after);
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

    expect(windowsReducer(before, minimizeWindow({id: 'abc123'}))).toEqual(after);
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

    expect(windowsReducer(before, toggleWindowSideBar({id: 'abc123'}))).toEqual(after);
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

    expect(windowsReducer(before, setWindowViewType({viewType: 'book', windowId: 'abc123'}))).toEqual(after);
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

      expect(windowsReducer(before, setWindowSideBarPanel({panelType: 'info', windowId: 'abc123'}))).toEqual(after);
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
    }, setCanvas({canvasIndex: 5, windowId: 'abc123'}))).toEqual({
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
    }, setWindowSize({size: {height: 200, width: 200, x: 20, y: 20}, windowId: 'abc123'}))).toEqual({
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
    }, updateWindowPosition({position: {x: 20, y: 20}, windowId: 'abc123'}))).toEqual({
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

      expect(windowsReducer(beforeState, selectAnnotation({annotationId: 'aId', canvasId: 'cId', windowId: 'abc123'}))).toEqual(expectedState);
    });

    it('adds new annotation IDs to existing canvas IDs', () => {
      const beforeState = { abc123: { selectedAnnotations: { cId: ['prevId'] } } };
      const expectedState = {
        abc123: { selectedAnnotations: { cId: ['prevId', 'aId'] } },
      };

      expect(windowsReducer(beforeState, selectAnnotation({annotationId: 'aId', canvasId: 'cId', windowId: 'abc123'}))).toEqual(expectedState);
    });

    describe('DESELECT_ANNOTATION', () => {
      it('removes the given annotation Id', () => {
        const beforeState = { abc123: { selectedAnnotations: { cId: ['aId1', 'aId2'] } } };
        const expectedState = {
          abc123: { selectedAnnotations: { cId: ['aId2'] } },
        };

        expect(windowsReducer(beforeState, deselectAnnotation({annotationId: 'aId1', canvasId: 'cId', windowId: 'abc123'}))).toEqual(expectedState);
      });

      it('removes the given canvas Id from the selected annotations if there are no more IDs', () => {
        const beforeState = { abc123: { selectedAnnotations: { cId1: ['aId1'], cId2: ['aId2'] } } };
        const expectedState = {
          abc123: { selectedAnnotations: { cId1: ['aId1'] } },
        };

        expect(windowsReducer(beforeState, deselectAnnotation({annotationId: 'aId2', canvasId: 'cId2', windowId: 'abc123'}))).toEqual(expectedState);
      });
    });

    it('handles TOGGLE_ANNOTATION_DISPLAY by toggling the given window\'s displayAllAnnotation value', () => {
      const beforeState = { abc123: { displayAllAnnotations: false } };
      const expectedState = {
        abc123: { displayAllAnnotations: true },
      };

      expect(windowsReducer(beforeState, toggleAnnotationDisplay({windowId: 'abc123'}))).toEqual(expectedState);
    });
  });
});
