import {UPDATE_VIEWPORT} from "../action-types"
import {updateViewport} from "../viewport"

describe('viewport actions', () => {
  describe('updateViewport', () => {
    it('sets viewer state', () => {
      const id = 'abc123';
      const expectedAction = {
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
  })
})
