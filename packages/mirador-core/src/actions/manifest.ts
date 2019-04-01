import {REMOVE_MANIFEST} from './action-types';

export const removeManifest = (manifestId) => {
  return { manifestId, type: REMOVE_MANIFEST };
}
