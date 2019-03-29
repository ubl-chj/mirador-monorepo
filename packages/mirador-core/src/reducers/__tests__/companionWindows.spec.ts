import {addCompanionWindow, addWindow, removeCompanionWindow, removeWindow} from '../../actions'
import {companionWindowsReducer} from '../';

describe('companionWindowsReducer', () => {
  describe('ADD_COMPANION_WINDOW', () => {
    it('adds a new companion window', () => {
      const action = addCompanionWindow({content: 'info', id: 'abc123', position: 'right'});
      const beforeState = {};
      const expectedState = {
        abc123: {
          content: 'info',
          id: 'abc123',
          position: 'right',
        },
      };
      expect(companionWindowsReducer(beforeState, action)).toEqual(expectedState);
    });
  });

  describe('ADD_WINDOW', () => {
    it('adds default companion window(s)', () => {
      const action = addWindow(
        {
          companionWindows: {
            'cw-123':
              {
                content: 'info',
                id: 'banana',
                position: 'left',
                thumbnailNavigationId: 'zyx321'
              },
            'cw-456':
              {
                content: 'canvas_navigation',
                id: 'Banane',
                position: 'right',
                thumbnailNavigationId: 'zyx321'
              },
          }});
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

  /**
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
*/

  describe('REMOVE_COMPANION_WINDOW', () => {
    it('should remove a companion window', () => {
      const action = removeCompanionWindow({companionWindowIds: 'cw123', id: 'abc123'})
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
      const action = removeWindow({companionWindowIds: ['a', 'b'], id: 'abc123'});
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
