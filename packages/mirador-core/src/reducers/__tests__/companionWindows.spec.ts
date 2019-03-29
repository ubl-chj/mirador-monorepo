import {
  addCompanionWindow, addWindow,
  removeCompanionWindow, removeWindow,
  updateCompanionWindow
} from '../../actions'
import { companionWindowsReducer } from '../';

describe('companionWindowsReducer', () => {
  describe('ADD_COMPANION_WINDOW', () => {
    it('adds a new companion window', () => {
      const action = addCompanionWindow('info', 'right', 'abc123');
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
      const action = addWindow(
        [{
          content: 'info',
          id: 'banana',
          position: 'left',
        }, {
          content: 'canvas_navigation',
          id: 'Banane',
          position: 'right',
        }], 'abc123');
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
      const action = updateCompanionWindow('abc123', 'cw123', 'canvases', 'right')
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
      const action = removeCompanionWindow('abc123', 'cw123');
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
      const action = removeWindow(['a', 'b'], 'abc123');
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
