import {SET_CONFIG, UPDATE_CONFIG} from './action-types'
import {IConfig} from "mirador-core-model"

export const setConfig = (config: IConfig) => {
  return { config, type: SET_CONFIG };
}

export const updateConfig = (config: IConfig) => {
  return { config, type: UPDATE_CONFIG };
}
