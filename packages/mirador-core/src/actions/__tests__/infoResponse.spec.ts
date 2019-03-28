import {RECEIVE_INFO_RESPONSE, REMOVE_INFO_RESPONSE, REQUEST_INFO_RESPONSE,
  fetchInfoResponse, receiveInfoResponse, removeInfoResponse, requestInfoResponse} from '../../actions';
import {FetchMock} from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fetchMock = fetch as FetchMock;

describe('infoResponse actions', () => {
  describe('requestInfoResponse', () => {
    it('requests an infoResponse from given a url', () => {
      const id = 'abc123';
      const expectedAction = {
        infoId: id,
        type: REQUEST_INFO_RESPONSE,
      };
      expect(requestInfoResponse(id)).toEqual(expectedAction);
    });
  });
  describe('receiveInfoResponse', () => {
    it('recieves an infoResponse', () => {
      const id = 'abc123';
      const json = {
        content: 'image information request',
        id,
      };
      const expectedAction = {
        infoId: id,
        infoJson: json,
        type: RECEIVE_INFO_RESPONSE,
      };
      expect(receiveInfoResponse(id, json)).toEqual(expectedAction);
    });
  });
  describe('fetchInfoResponse', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' }));
      });
      it('dispatches the REQUEST_INFO_RESPONSE action', () => {
        store.dispatch(fetchInfoResponse('https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'));
        expect(store.getActions()).toEqual([
          { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'REQUEST_INFO_RESPONSE' },
        ]);
      });
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store.dispatch(fetchInfoResponse('https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'REQUEST_INFO_RESPONSE' },
              { infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', infoJson: { data: '12345' }, type: 'RECEIVE_INFO_RESPONSE' },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store.dispatch(fetchInfoResponse('https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json'))
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