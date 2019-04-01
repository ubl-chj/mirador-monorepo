import {REMOVE_INFO_RESPONSE} from './action-types'

export const removeInfoResponse = (infoId) => {
  return { infoId, type: REMOVE_INFO_RESPONSE };
}
