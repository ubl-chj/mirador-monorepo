import {RECEIVE_ANNOTATION, RECEIVE_ANNOTATION_FAILURE, REQUEST_ANNOTATION} from '../../actions'
import {annotationsReducer} from '../'

describe('annotation reducer', () => {
  it('should handle REQUEST_ANNOTATION', () => {
    expect(annotationsReducer({}, {
      annotationId: 'abc123',
      canvasId: 'foo',
      type: REQUEST_ANNOTATION,
    })).toEqual({
      foo: {
        abc123: {
          id: 'abc123',
          isFetching: true,
        },
      },
    });
  });
  it('should handle RECEIVE_ANNOTATION', () => {
    expect(annotationsReducer(
      {
        foo: {
          abc123: {
            id: 'abc123',
            isFetching: true,
          },
        },
      },
      {
        annotationId: 'abc123',
        annotationJson: {
          '@type': 'sc:AnnotationList',
          content: 'anno stuff',
          id: 'abc123',
        },
        canvasId: 'foo',
        type: RECEIVE_ANNOTATION,
      },
    )).toMatchObject({
      foo: {
        abc123: {
          id: 'abc123',
          isFetching: false,
          json: {},
        },
      },
    });
  });
  it('should handle RECEIVE_ANNOTATION_FAILURE', () => {
    expect(annotationsReducer(
      {
        foo: {
          abc123: {
            id: 'abc123',
            isFetching: true,
          },
        },
      },
      {
        annotationId: 'abc123',
        canvasId: 'foo',
        error: "This institution didn't enable CORS.",
        type: RECEIVE_ANNOTATION_FAILURE,
      },
    )).toEqual({
      foo: {
        abc123: {
          error: "This institution didn't enable CORS.",
          id: 'abc123',
          isFetching: false,
        },
      },
    });
  });
});
