import {RECEIVE_INFO_RESPONSE, RECEIVE_INFO_RESPONSE_FAILURE, REMOVE_INFO_RESPONSE, REQUEST_INFO_RESPONSE} from '../../actions'
import { infoResponsesReducer } from '../';

describe('info response reducer', () => {
  it('should handle REQUEST_INFO_RESPONSE', () => {
    expect(infoResponsesReducer({}, {
      infoId: 'abc123',
      type: REQUEST_INFO_RESPONSE,
    })).toEqual({
      abc123: {
        id: 'abc123',
        isFetching: true,
      },
    });
  });
  it('should handle RECEIVE_INFO_RESPONSE', () => {
    expect(infoResponsesReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        infoId: 'abc123',
        infoJson: {
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
          id: 'abc123',
        },
        type: RECEIVE_INFO_RESPONSE,
      },
    )).toMatchObject({
      abc123: {
        id: 'abc123',
        isFetching: false,
        json: {},
      },
    });
  });
  it('should handle RECEIVE_INFO_RESPONSE_FAILURE', () => {
    expect(infoResponsesReducer(
      {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
      {
        error: "This institution didn't enable CORS.",
        infoId: 'abc123',
        type: RECEIVE_INFO_RESPONSE_FAILURE,
      },
    )).toEqual({
      abc123: {
        error: "This institution didn't enable CORS.",
        id: 'abc123',
        isFetching: false,
      },
    });
  });
  it('should handle REMOVE_INFO_RESPONSE', () => {
    expect(infoResponsesReducer(
      {
        abc123: {
          id: 'abc123',
          stuff: 'foo',
        },
        def456: {
          id: 'def456',
          stuff: 'foo',
        },
      },
      {
        infoId: 'abc123',
        type: REMOVE_INFO_RESPONSE,
      },
    )).toEqual({
      def456: {
        id: 'def456',
        stuff: 'foo',
      },
    });
  });
});
