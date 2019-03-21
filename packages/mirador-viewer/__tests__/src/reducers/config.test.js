import { ActionTypes, configReducer } from '@mirador/core';

describe('config reducer', () => {
  describe('SET_CONFIG', () => {
    it('should handle SET_CONFIG', () => {
      expect(configReducer({}, {
        config: { manifestVersion: 'v3' },
        type: ActionTypes.SET_CONFIG,
      })).toEqual({
        manifestVersion: 'v3',
      });
    });
    it('does not deep merge', () => {
      expect(configReducer({ stuff: { foo: 'bar' } }, {
        config: { stuff: { foo: 'bat' } },
        type: ActionTypes.SET_CONFIG,
      })).toEqual({
        stuff: { foo: 'bat' },
      });
    });
  });
  describe('UPDATE_CONFIG', () => {
    it('should handle UPDATE_CONFIG', () => {
      expect(configReducer({}, {
        config: { manifestVersion: 'v3' },
        type: ActionTypes.UPDATE_CONFIG,
      })).toEqual({
        manifestVersion: 'v3',
      });
    });
    it('does a deep merge', () => {
      expect(configReducer({
        hello: 'world',
        stuff: { foo: 'bar' },
      }, {
        config: { stuff: { foo: 'bat' } },
        type: ActionTypes.UPDATE_CONFIG,
      })).toEqual({
        hello: 'world',
        stuff: { foo: 'bat' },
      });
    });
  });
});
