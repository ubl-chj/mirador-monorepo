import {REMOVE_INFO_RESPONSE, fetchInfoResponse, removeInfoResponse} from '../../actions';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('infoResponse actions', () => {
  describe('fetchInfoResponse', () => {
    let store = null;
    beforeEach(() => {
      fetchMock.reset()
      store = mockStore({});
    });
    describe('infoResponse success response', () => {
      beforeEach(() => {
        fetchMock.get('https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', {protocol: "http://iiif.io/api/image"});
      });
      it('dispatches the REQUEST_INFO_RESPONSE action', () => {
        store.dispatch(fetchInfoResponse.action({infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'}));
        expect(store.getActions()).toEqual([
          {payload: {infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'}, type: 'FETCH_INFO_RESPONSE_STARTED'}]);
      });
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store.dispatch(fetchInfoResponse.action({infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {payload: {infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'}, type: 'FETCH_INFO_RESPONSE_STARTED'},
              {payload: {params: {infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'},
                result: { protocol: "http://iiif.io/api/image" },
              },
              type: 'FETCH_INFO_RESPONSE_DONE'}
            ]);
          });
      });
    });
    describe('infoResponse error response', () => {
      beforeEach(() => {
        fetchMock.get('*', () => {
          throw new Error("FetchError: invalid json response body at undefined reason: Unexpected end of JSON input")
        });
      });
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE error', () => {
        store.dispatch(fetchInfoResponse.action({infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'REQUEST_INFO_RESPONSE' },
              { error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'), infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'RECEIVE_INFO_RESPONSE_FAILURE' },
            ]);
          });
      });
    });
  });
  describe('removeInfoResponse', () => {
    it('removes an existing infoResponse', () => {
      const expectedAction = {
        infoId: 'foo',
        type: REMOVE_INFO_RESPONSE,
      };
      expect(removeInfoResponse('foo')).toEqual(expectedAction);
    });
  });
});
