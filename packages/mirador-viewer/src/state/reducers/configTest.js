import deepmerge from 'deepmerge';
import ActionTypes from '@mirador/actions';

/**
 * configReducer - does a deep merge of the config
 */
export const configTestReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_CONFIG:
      return deepmerge(state, action.config);
    case ActionTypes.SET_CONFIG:
      return action.config;
    default:
      return state;
  }
};
