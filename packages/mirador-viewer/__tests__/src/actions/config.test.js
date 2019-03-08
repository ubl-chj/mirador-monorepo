import {ActionTypes, setConfig, updateConfig} from '@mirador/core';

describe('config actions', () => {
  describe('setConfig', () => {
    it('sets the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        type: ActionTypes.SET_CONFIG,
        config,
      };
      expect(setConfig(config)).toEqual(expectedAction);
    });
  });
  describe('updateConfig', () => {
    it('updates the config', () => {
      const config = { foo: 'bar' };
      const expectedAction = {
        type: ActionTypes.UPDATE_CONFIG,
        config,
      };
      expect(updateConfig(config)).toEqual(expectedAction);
    });
  });
});
