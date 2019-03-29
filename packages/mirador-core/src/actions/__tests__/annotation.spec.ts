import {DESELECT_ANNOTATION, RECEIVE_ANNOTATION, REQUEST_ANNOTATION, SELECT_ANNOTATION, TOGGLE_ANNOTATION_DISPLAY,
  deselectAnnotation, fetchAnnotation, receiveAnnotation,
  requestAnnotation, selectAnnotation, toggleAnnotationDisplay} from '../../actions';
import {FetchMock} from 'jest-fetch-mock'
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const fetchMock = fetch as FetchMock;

describe('annotation actions', () => {
  describe('requestAnnotation', () => {
    it('requests an annotation from given a url', () => {
      const canvasId = 'foo';
      const annotationId = 'abc123';
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          annotationId,
          canvasId,
        },
        type: REQUEST_ANNOTATION,
      };
      expect(requestAnnotation(annotationId, canvasId)).toEqual(expectedAction);
    });
  });
  describe('receiveAnnotation', () => {
    it('recieves an annotation', () => {
      const canvasId = 'foo';
      const annotationId = 'abc123';
      const json = {
        annotationId,
        content: 'annotation request',
      };
      const expectedAction = {
        error: undefined,
        meta: undefined,
        payload: {
          annotationId,
          annotationJson: json,
          canvasId,
        },
        type: RECEIVE_ANNOTATION,
      };
      expect(receiveAnnotation(annotationId, json, canvasId)).toEqual(expectedAction);
    });
  });
  describe('fetchAnnotation', () => {
    let store = null;
    beforeEach(() => {
      store = mockStore({});
    });
    describe('success response', () => {
      beforeEach(() => {
        fetchMock.mockResponseOnce(JSON.stringify({ data: '12345' })); // eslint-disable-line no-undef
      });
      it('dispatches the REQUEST_ANNOTATION action', () => {
        store.dispatch(fetchAnnotation(
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
        ));
        expect(store.getActions()).toEqual([
          { error: undefined,
            meta: undefined,
            payload: {
              annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
              canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
            },
            type: 'REQUEST_ANNOTATION',
          },
        ]);
      });
      it('dispatches the REQUEST_ANNOTATION and then RECEIVE_ANNOTATION', () => {
        store.dispatch(fetchAnnotation(
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { error: undefined,
                meta: undefined,
                payload: {
                  annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                  canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                },
                type: 'REQUEST_ANNOTATION',
              },
              {
                error: undefined,
                meta: undefined,
                payload: {
                  annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                  annotationJson: {data: '12345'},
                  canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                },
                type: 'RECEIVE_ANNOTATION',
              },
            ]);
          });
      });
    });
    describe('error response', () => {
      it('dispatches the REQUEST_ANNOTATION and then RECEIVE_ANNOTATION', () => {
        store.dispatch(fetchAnnotation(
          'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
          'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
        ))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {
                error: undefined,
                meta: undefined,
                payload: {
                  annotationId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/list/47174896',
                  canvasId: 'https://iiif.harvardartmuseums.org/manifests/object/299843/canvas/canvas-47174896',
                },
                type: 'REQUEST_ANNOTATION',
              },
              {
                error: undefined,
                meta: undefined,
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
      error: undefined,
      meta: undefined,
      payload: {
        annotationId,
        canvasId,
        windowId,
      },
      type: SELECT_ANNOTATION,
    };
    expect(selectAnnotation(annotationId, canvasId, windowId)).toEqual(expectedAction);
  });

  it('handles the deselectAnnotation action', () => {
    const windowId = 'wId1';
    const canvasId = 'cId1';
    const annotationId = 'aId1';
    const expectedAction = {
      error: undefined,
      meta: undefined,
      payload: {
        annotationId,
        canvasId,
        windowId,
      },
      type: DESELECT_ANNOTATION,
    };
    expect(deselectAnnotation(annotationId, canvasId, windowId)).toEqual(expectedAction);
  });

  it('handles the toggleAnnotationDisplay action', () => {
    const windowId = 'wId1';
    const expectedAction = {
      error: undefined,
      meta: undefined,
      payload: {
        windowId,
      },
      type: TOGGLE_ANNOTATION_DISPLAY,
    };
    expect(toggleAnnotationDisplay(windowId)).toEqual(expectedAction);
  });
});
