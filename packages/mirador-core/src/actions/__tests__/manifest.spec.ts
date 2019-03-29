import {REMOVE_MANIFEST, fetchManifest, removeManifest} from '../../actions';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('manifest actions', () => {
  describe('fetchManifest', () => {
    let store = null;
    beforeEach(() => {
      fetchMock.reset()
      store = mockStore({});
    });
    describe('manifest success response', () => {
      beforeEach(() => {
        fetchMock.get('*', { label: 'Some Manifest' });
      });
      it('dispatches the REQUEST_MANIFEST action', () => {
        store.dispatch(fetchManifest.action({manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'}));
        expect(store.getActions()).toEqual([
          {payload: {manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'},
            type: 'FETCH_MANIFEST_STARTED'}]);
      });
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store.dispatch(fetchManifest.action({manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {payload: {manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'},
                type: 'FETCH_MANIFEST_STARTED',
              },
              {payload: {
                params: {manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'},
                result: {label: 'Some Manifest'},
              },
              type: 'FETCH_MANIFEST_DONE',
              }
            ]);
          });
      });
    });
    describe('manifest error response', () => {
      beforeEach(() => {
        fetchMock.get('*', () => {
          throw new Error("FetchError: invalid json response body at undefined reason: Unexpected end of JSON input")
        });
      });
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST error', () => {
        store.dispatch(fetchManifest.action({manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest'}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                type: 'FETCH_MANIFEST_STARTED',
              },
              {
                error: 'FetchError: invalid json response body at undefined reason: Unexpected end of JSON input',
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                type: 'RECEIVE_MANIFEST_FAILURE',
              },
            ]);
          });
      });
    });
  });
  describe('removeManifest', () => {
    it('removes an existing manifest', () => {
      const expectedAction = {
        manifestId: 'foo',
        type: REMOVE_MANIFEST,
      };
      expect(removeManifest('foo')).toEqual(expectedAction);
    });
  });
});
