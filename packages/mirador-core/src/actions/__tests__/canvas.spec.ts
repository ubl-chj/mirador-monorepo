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
});
