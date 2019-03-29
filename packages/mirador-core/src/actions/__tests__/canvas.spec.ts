import {SET_CANVAS, UPDATE_VIEWPORT, setCanvas, updateViewport} from '../../actions';

const debounceTime = 100;

describe('canvas actions', () => {
  describe('setCanvas', () => {
    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          canvasIndex: 100,
          windowId: id,
        },
        type: SET_CANVAS,
      };
      expect(setCanvas({canvasIndex: 100, windowId: id})).toEqual(expectedAction);
    });
  });
  describe('updateViewport', () => {
    it('sets viewer state', () => {
      const id = 'abc123';
      const expectedAction = {
        error: undefined,
        meta: {debounce: {time: 100}},
        payload: {
          windowId: id,
          x: 1,
          y: 0,
          zoom: 0.5,
        },
        type: UPDATE_VIEWPORT,
      };
      expect(updateViewport({windowId: id, x: 1, y: 0, zoom: 0.5})).toEqual(expectedAction);
    });
  });
});
