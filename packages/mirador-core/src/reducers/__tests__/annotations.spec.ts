import {receiveAnnotation, receiveAnnotationFailure, requestAnnotation} from '../../actions'
import {annotationsReducer} from '../'

describe('annotation reducer', () => {
  it('should handle REQUEST_ANNOTATION', () => {
    expect(annotationsReducer({}, requestAnnotation('abc123', 'foo'))).toEqual({
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
      receiveAnnotation('abc123', {
        annotationJson: {
          '@type': 'sc:AnnotationList',
          content: 'anno stuff',
          id: 'abc123',
        },
      },
      'foo'))).toMatchObject({
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
      receiveAnnotationFailure('abc123', 'foo', "This institution didn't enable CORS."))).toEqual({
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
