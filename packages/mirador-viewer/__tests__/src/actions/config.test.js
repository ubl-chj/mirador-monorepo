import {ActionTypes, setConfig, updateConfig} from '@mirador/core';

describe('config actions', () => {
  describe('setConfig', () => {
    it('sets the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        config,
        type: ActionTypes.SET_CONFIG,
      };
      expect(setConfig(config)).toEqual(expectedAction);
    });
  });
  describe('updateConfig', () => {
    it('updates the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        config,
        type: ActionTypes.UPDATE_CONFIG,
      };
      expect(updateConfig(config)).toEqual(expectedAction);
    });
  });
});
