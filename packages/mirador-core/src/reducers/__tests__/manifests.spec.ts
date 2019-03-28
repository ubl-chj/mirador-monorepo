import {RECEIVE_MANIFEST, RECEIVE_MANIFEST_FAILURE, REMOVE_MANIFEST, REQUEST_MANIFEST} from '../../actions'
import {manifests} from '../';

describe('manifests reducer', () => {
  it('should handle REQUEST_MANIFEST', () => {
    expect(manifests({}, {
      manifestId: 'abc123',
      type: REQUEST_MANIFEST,
    })).toEqual({
      abc123: {
        id: 'abc123',
      },
    });
  });
  it('should handle RECEIVE_MANIFEST', () => {
    expect(manifests(
      {
        abc123: {
          error: 'Error fetching manifest',
          id: 'abc123',
          isFetching: true,
          json: {}
        },
      },
      {
        manifestId: 'abc123',
        manifestJson: {
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
          id: 'abc123',
        },
        type: RECEIVE_MANIFEST,
      },
    )).toMatchObject({
      abc123: {
        error: null,
        id: 'abc123',
        isFetching: false,
        json: {
          '@type': 'sc:Manifest',
          content: 'lots of canvases and metadata and such',
          id: 'abc123',
        },
      },
    });
  });

  it('should handle RECEIVE_MANIFEST_FAILURE', () => {
    expect(manifests(
      {
        abc123: {
          error: null,
          id: 'abc123',
          isFetching: true,
          json: {}
        },
      },
      {
        error: "This institution didn't enable CORS.",
        manifestId: 'abc123',
        type: RECEIVE_MANIFEST_FAILURE,
      },
    )).toEqual({
      abc123: {
        error: "This institution didn't enable CORS.",
        id: 'abc123',
        isFetching: false,
        json: {}
      },
    });
  });
  it('should handle REMOVE_MANIFEST', () => {
    expect(manifests(
      {
        abc123: {
          error: null,
          id: 'abc123',
          isFetching: false,
          json: {
            foo: 'foo'
          },
        },
        def456: {
          error: null,
          id: 'def456',
          isFetching: false,
          json: {
            foo: 'foo'
          },
        },
      },
      {
        manifestId: 'abc123',
        type: REMOVE_MANIFEST,
      },
    )).toEqual({
      def456: {
        error: null,
        id: 'def456',
        isFetching: false,
        json: {
          foo: 'foo'
        },
      },
    });
  });
});
