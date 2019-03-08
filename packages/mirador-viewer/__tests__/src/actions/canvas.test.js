import {ActionTypes, setCanvas, updateViewport} from '@mirador/core';

describe('canvas actions', () => {
  describe('setCanvas', () => {
    it('sets to a defined canvas', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.SET_CANVAS,
        windowId: id,
        canvasIndex: 100,
      };
      expect(setCanvas(id, 100)).toEqual(expectedAction);
    });
  });
  describe('updateViewport', () => {
    it('sets viewer state', () => {
      const id = 'abc123';
      const expectedAction = {
        type: ActionTypes.UPDATE_VIEWPORT,
        windowId: id,
        payload: {
          x: 1,
          y: 0,
          zoom: 0.5,
        },
      };
      expect(updateViewport(id, { x: 1, y: 0, zoom: 0.5 })).toEqual(expectedAction);
    });
  });
});
