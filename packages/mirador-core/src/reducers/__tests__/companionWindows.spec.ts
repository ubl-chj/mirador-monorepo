import {ADD_COMPANION_WINDOW, ADD_WINDOW, REMOVE_COMPANION_WINDOW, REMOVE_WINDOW, UPDATE_COMPANION_WINDOW} from '../../actions'
import { companionWindowsReducer } from '../';

describe('companionWindowsReducer', () => {
  describe('ADD_COMPANION_WINDOW', () => {
    it('adds a new companion window', () => {
      const action = {
        id: 'abc123',
        payload: { content: 'info', position: 'right' },
        type: ADD_COMPANION_WINDOW,
      };
      const beforeState = {};
      const expectedState = {
        abc123: {
          content: 'info',
          position: 'right',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('ADD_WINDOW', () => {
    it('adds default companion window(s)', () => {
      const action = {
        companionWindows: [{
          content: 'info',
          id: 'banana',
          position: 'left',
        }, {
          content: 'canvas_navigation',
          id: 'Banane',
          position: 'right',
        }],
        type: ADD_WINDOW,
      };
      const beforeState = {};
      const expectedState = {
        Banane: {
          content: 'canvas_navigation',
          id: 'Banane',
          position: 'right',
        },
        banana: {
          content: 'info',
          id: 'banana',
          position: 'left',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });


  describe('UPDATE_COMPANION_WINDOW', () => {
    it('updates an existing companion window', () => {
      const action = {
        id: 'abc123',
        payload: { content: 'canvases', foo: 'bar' },
        type: UPDATE_COMPANION_WINDOW,
      };
      const beforeState = {
        abc123: {
          content: 'info',
          position: 'right',
        },
      };
      const expectedState = {
        abc123: {
          content: 'canvases',
          foo: 'bar',
          position: 'right',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('REMOVE_COMPANION_WINDOW', () => {
    it('should remove a companion window', () => {
      const action = {
        id: 'abc123',
        type: REMOVE_COMPANION_WINDOW,
      };
      const beforeState = {
        abc123: {
          content: 'info',
          position: 'right',
        },
      };
      const expectedState = {};
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('REMOVE_WINDOW', () => {
    it('should remove a companion window', () => {
      const action = {
        companionWindowIds: ['a', 'b'],
        id: 'abc123',
        type: REMOVE_WINDOW,
      };
      const beforeState = {
        a: {},
        b: {},
        c: {},
      };
      const expectedState = { c: {} };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });
});
