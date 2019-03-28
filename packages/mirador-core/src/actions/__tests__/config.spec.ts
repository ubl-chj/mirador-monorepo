import {SET_CONFIG, UPDATE_CONFIG, setConfig, updateConfig} from '../../actions'

describe('config actions', () => {
  describe('setConfig', () => {
    it('sets the config', () => {
      const config: any = {foo: 'bar'}
      const expectedAction = {
        config, type: SET_CONFIG,
      }
      expect(setConfig(config)).toEqual(expectedAction)
    })
  })
  describe('updateConfig', () => {
    it('updates the config', () => {
      const config: any = {foo: 'bar'}
      const expectedAction = {
        config, type: UPDATE_CONFIG,
      }
      expect(updateConfig(config)).toEqual(expectedAction)
    })
  })
})
