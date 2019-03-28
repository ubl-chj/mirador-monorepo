import {SET_CONFIG, UPDATE_CONFIG} from '../../actions'
import { configReducer } from '../';

describe('config reducer', () => {
  describe('SET_CONFIG', () => {
    it('should handle SET_CONFIG', () => {
      expect(configReducer({}, {
        config: { manifestVersion: 'v3' },
        type: SET_CONFIG,
      })).toEqual({
        manifestVersion: 'v3',
      });
    });
    it('does not deep merge', () => {
      expect(configReducer({ stuff: { foo: 'bar' } }, {
        config: { stuff: { foo: 'bat' } },
        type: SET_CONFIG,
      })).toEqual({
        stuff: { foo: 'bat' },
      });
    });
  });
  describe('UPDATE_CONFIG', () => {
    it('should handle UPDATE_CONFIG', () => {
      expect(configReducer({}, {
        config: { manifestVersion: 'v3' },
        type: UPDATE_CONFIG,
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
        type: UPDATE_CONFIG,
      })).toEqual({
        hello: 'world',
        stuff: { foo: 'bat' },
      });
    });
  });
});
