import {
  ADD_COMPANION_WINDOW,
  REMOVE_COMPANION_WINDOW,
  UPDATE_COMPANION_WINDOW,
  addCompanionWindow,
  removeCompanionWindow,
  updateCompanionWindow
} from '../../actions';

describe('companionWindow actions', () => {
  describe('addCompanionWindow', () => {
    it('should return correct action object', () => {
      const expectedAction = {
        payload: {
          content: 'info',
          id: 'cw-123',
          position: 'right',
        },
        type: ADD_COMPANION_WINDOW
      };
      const action = addCompanionWindow({content: 'info', id: 'cw-123', position: 'right'});

      expect(action.type).toBe(ADD_COMPANION_WINDOW);
      expect(action).toEqual(expectedAction)
    });

    it('should set the correct default values', () => {
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          content: 'bah',
          id: 'cw-abc123',
          position: 'down',
        },
        type: ADD_COMPANION_WINDOW
      };
      const action = addCompanionWindow({content: 'bah', id: 'cw-abc123', position: 'down'});
      expect(action.type).toBe(ADD_COMPANION_WINDOW);
      expect(action).toEqual(expectedAction)
    });

    it('should generate a new companionWindow ID', () => {
      const action = addCompanionWindow({content: 'info', id: 'cw-123-123', position: 'right'});

      expect(action.payload.id).toEqual(
        expect.stringMatching(/^cw-\w+-\w+/),
      );
    });
  });

  describe('updateCompanionWindow', () => {
    it('should return correct action object', () => {
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          content: 'info',
          id: 'cw-123',
          position: 'right',
          windowId: 'abc123',
        },
        type: UPDATE_COMPANION_WINDOW
      };
      const action = updateCompanionWindow({content: 'info', id: 'cw-123', position: 'right', windowId: 'abc123'});
      expect(action.type).toBe(UPDATE_COMPANION_WINDOW);
      expect(action).toEqual(expectedAction)
    });
  });

  describe('removeCompanionWindow', () => {
    it('should return correct action object', () => {
      const action = removeCompanionWindow({companionWindowIds: 'cw-123', id: 'window'});
      expect(action.type).toBe(REMOVE_COMPANION_WINDOW);
    });
  });
});
