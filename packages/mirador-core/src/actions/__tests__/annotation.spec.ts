import {
  DESELECT_ANNOTATION,
  SELECT_ANNOTATION,
  TOGGLE_ANNOTATION_DISPLAY,
  deselectAnnotation,
  fetchAnnotation,
  receiveAnnotation,
  requestAnnotation,
  selectAnnotation,
  toggleAnnotationDisplay
} from '../../actions';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('annotation actions', () => {
  describe('requestAnnotation', () => {
    it('requests an annotation from given a url', () => {
      const canvasId = 'foo';
      const annotationId = 'abc123';
      const expectedAction = {
        payload: {
          annotationId,
          canvasId,
        },
        type: 'REQUEST_ANNOTATION',
      };
      expect(requestAnnotation({annotationId, canvasId})).toEqual(expectedAction);
    });
  });
  describe('receiveAnnotation', () => {
    it('receives an annotation', () => {
      const canvasId = 'foo';
      const annotationId = 'abc123';
      const json = {
        annotationId,
        canvasId,
        content: 'annotation request',
      };
      const expectedAction = {
        payload: {
          annotationId,
          annotationJson: json,
          canvasId,
        },
        type: 'RECEIVE_ANNOTATION',
      };
      expect(receiveAnnotation({annotationId, annotationJson: json, canvasId})).toEqual(expectedAction);
    });
  });
  describe('fetchAnnotation', () => {
    let store = null;
    beforeEach(() => {
      fetchMock.reset()
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetchMock.get('https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896', {label: "Annotation List"});
      });
      it('dispatches the REQUEST_ANNOTATION action', () => {
        store.dispatch(fetchAnnotation.action({
          annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
        }))
        expect(store.getActions()).toEqual([
          {payload: {
            annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
            canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
          },
          type: 'FETCH_ANNOTATION_STARTED',
          },
        ]);
      });
      it('dispatches the REQUEST_ANNOTATION and then RECEIVE_ANNOTATION', () => {
        store.dispatch(fetchAnnotation.action({
          annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
        }))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {payload: {
                annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
              },
              type: 'FETCH_ANNOTATION_STARTED'},
              {payload: {
                params: {
                  annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                  canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                },
                result: {label: "Annotation List"},
              },
              type: 'FETCH_ANNOTATION_DONE',
              },
            ]);
          });
      });
    });
    describe('error response', () => {
      beforeEach(() => {
        fetchMock.get('*', () => {
          throw new Error("FetchError: invalid json response body at undefined reason: Unexpected end of JSON input")
        });
      });
      it('dispatches the REQUEST_ANNOTATION and then RECEIVE_ANNOTATION error', () => {
        store.dispatch(fetchAnnotation.action({
          annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
        }))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                payload: {
                  annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                  canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                },
                type: 'FETCH_ANNOTATION_STARTED',
              },
              {
                payload: {
                  annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                  canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                  error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'),
                },
                type: 'RECEIVE_ANNOTATION_FAILURE',
              },
            ]);
          });
      });
    });
  });

  it('handles the selectAnnotation action', () => {
    const windowId = 'wId1';
    const canvasId = 'cId1';
    const annotationId = 'aId1';
    const expectedAction = {
      payload: {
        annotationId,
        canvasId,
        windowId,
      },
      type: SELECT_ANNOTATION,
    };
    expect(selectAnnotation({annotationId, canvasId, windowId})).toEqual(expectedAction);
  });

  it('handles the deselectAnnotation action', () => {
    const windowId = 'wId1';
    const canvasId = 'cId1';
    const annotationId = 'aId1';
    const expectedAction = {
      payload: {
        annotationId,
        canvasId,
        windowId,
      },
      type: DESELECT_ANNOTATION,
    };
    expect(deselectAnnotation({annotationId, canvasId, windowId})).toEqual(expectedAction);
  });

  it('handles the toggleAnnotationDisplay action', () => {
    const windowId = 'wId1';
    const expectedAction = {
      payload: {
        windowId,
      },
      type: TOGGLE_ANNOTATION_DISPLAY,
    };
    expect(toggleAnnotationDisplay({windowId})).toEqual(expectedAction);
  });
});
