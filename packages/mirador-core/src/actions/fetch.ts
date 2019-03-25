export const FETCH_MANIFEST = "FETCH_MANIFEST"
export const FETCH_MANIFEST_SUCCESS = "FETCH_MANIFEST_SUCCESS"
export const FETCH_MANIFEST_FAILURE = "FETCH_MANIFEST_FAILURE"

export const fetchManifestRequest = () => ({
  type: FETCH_MANIFEST,
});

export const fetchManifestSuccess = (manifest) => ({
  payload: manifest,
  type: FETCH_MANIFEST_SUCCESS,
});

export const fetchManifestFailure = (message) => ({
  payload: message,
  type: FETCH_MANIFEST_FAILURE,
})
