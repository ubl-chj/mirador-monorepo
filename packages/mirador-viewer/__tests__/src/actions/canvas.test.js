import {ActionTypes, setCanvas, updateViewport} from '@mirador/core';

const debounceTime = 100;

describe('canvas actions', () => {
  describe('setCanvas', () => {
    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        canvasIndex: 100,
        type: ActionTypes.SET_CANVAS,
        windowId: id,
      };
      expect(setCanvas(id, 100)).toEqual(expectedAction);
    });
  });
  describe('updateViewport', () => {
    it('sets viewer state', () => {
      const id = 'abc123';
      const expectedAction = {
        meta: {
          debounce: {
            time: debounceTime,
          },
        },
        payload: {
          x: 1,
          y: 0,
          zoom: 0.5,
        },
        type: ActionTypes.UPDATE_VIEWPORT,
        windowId: id,
      };
      expect(updateViewport(id, { x: 1, y: 0, zoom: 0.5 })).toEqual(expectedAction);
    });
  });
});
