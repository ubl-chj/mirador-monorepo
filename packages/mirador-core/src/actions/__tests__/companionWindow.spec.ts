import {ADD_COMPANION_WINDOW, REMOVE_COMPANION_WINDOW, UPDATE_COMPANION_WINDOW,
  addCompanionWindow, removeCompanionWindow, updateCompanionWindow} from '../../actions';

describe('companionWindow actions', () => {
  describe('addCompanionWindow', () => {
    it('should return correct action object', () => {
      const payload = {
        content: 'info',
        foo: 'bar',
        position: 'right',
      };
      const mockState = {
        companionWindows: {},
        windows: {
          abc123: { companionWindowIds: [] },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = addCompanionWindow('abc123', payload);
      thunk(mockDispatch, mockGetState);

      const action: any = mockDispatch.mock.calls[0].shift()
      expect(action.type).toBe(ADD_COMPANION_WINDOW);
      expect(action.payload).toMatchObject(payload);
      expect(action.payload.id).toMatch(/cw-.*/);
    });

    it('should set the correct default values', () => {
      const payload = {};
      const defaults = { content: 'bah', foo: 'bar', position: 'down' };
      const mockState = {
        companionWindows: {},
        windows: {
          abc123: { companionWindowIds: [] },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);
      const thunk = addCompanionWindow('abc123', payload, defaults);
      thunk(mockDispatch, mockGetState);

      const action: any = mockDispatch.mock.calls[0].shift();

      expect(action.payload.foo).toBe('bar');
    });

    it('should generate a new companionWindow ID', () => {
      const payload = {};
      const mockState = {
        companionWindows: {},
        windows: {
          abc123: { companionWindowIds: [] },
        },
      };

      const mockDispatch = jest.fn(() => ({}));
      const mockGetState = jest.fn(() => mockState);

      const thunk = addCompanionWindow('abc123', payload);
      thunk(mockDispatch, mockGetState);
      const action: any = mockDispatch.mock.calls[0].shift();

      expect(action.id).toEqual(
        expect.stringMatching(/^cw-\w+-\w+/),
      );
    });
  });

  describe('updateCompanionWindow', () => {
    it('should return correct action object', () => {
      const expectedAction = {
        payload: {
          content: 'info',
          foo: 'bar',
          id: 'cw-123',
          position: 'right',
          windowId: 'abc123',
        },
        type: UPDATE_COMPANION_WINDOW
      };
      const payload = {
        content: 'info',
        foo: 'bar',
        position: 'right',
      }
      const action = updateCompanionWindow('abc123', 'cw-123', payload);
      expect(action.type).toBe(UPDATE_COMPANION_WINDOW);
      expect(action).toEqual(expectedAction)
    });
  });

  describe('removeCompanionWindow', () => {
    it('should return correct action object', () => {
      const action = removeCompanionWindow('window', 'cw-123');
      expect(action.type).toBe(REMOVE_COMPANION_WINDOW);
      expect(action.payload.id).toBe('cw-123');
      expect(action.payload.windowId).toBe('window');
    });
  });
});
