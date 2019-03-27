import {RECEIVE_MANIFEST, REMOVE_MANIFEST, REQUEST_MANIFEST,
  fetchManifest, receiveManifest, removeManifest, requestManifest} from '../../actions';
import {FetchMock} from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fetchMock = fetch as FetchMock;

describe('manifest actions', () => {
  describe('requestManifest', () => {
    it('requests a manifest given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        manifestId: id,
        properties: {},
        type: REQUEST_MANIFEST,
      };
      expect(requestManifest(id, {})).toEqual(expectedAction);
    });
  });
  describe('receiveManifest', () => {
    it('receives a manifest', () => {
      const id = 'abc123';
      const json = {
        content: 'lots of metadata, canvases, and other IIIFy things',
        id,
      };
      const expectedAction = {
        manifestId: id,
        manifestJson: json,
        type: RECEIVE_MANIFEST,
      };
      expect(receiveManifest(id, json)).toEqual(expectedAction);
    });
  });
  describe('fetchManifest', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
      });
      it('dispatches the REQUEST_MANIFEST action', () => {
        store.dispatch(fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest', {}));
        expect(store.getActions()).toEqual([
          {
            manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
            properties: { isFetching: true },
            type: 'REQUEST_MANIFEST',
          },
        ]);
      });
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store.dispatch(fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest', {}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                properties: { isFetching: true },
                type: 'REQUEST_MANIFEST',
              },
              {
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                manifestJson: { data: '12345' },
                type: 'RECEIVE_MANIFEST',
              },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_MANIFEST and then RECEIVE_MANIFEST', () => {
        store.dispatch(fetchManifest('https://purl.stanford.edu/sn904cj3429/iiif/manifest', {}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                manifestId: 'https://purl.stanford.edu/sn904cj3429/iiif/manifest',
                properties: { isFetching: true },
                type: 'REQUEST_MANIFEST',
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
