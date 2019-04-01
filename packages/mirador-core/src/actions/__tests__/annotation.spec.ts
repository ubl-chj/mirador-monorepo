import {
  DESELECT_ANNOTATION, SELECT_ANNOTATION, TOGGLE_ANNOTATION_DISPLAY,
  deselectAnnotation, fetchAnnotationWorker, selectAnnotation, toggleAnnotationDisplay
} from '../../actions';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock'
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('annotation actions', () => {
  describe('annotationResponse', () => {
    let store = null;
    beforeEach(() => {
      fetchMock.reset()
      store = mockStore({});
    });
    describe('annotation success response', () => {
      beforeEach(() => {
        fetchMock.get('https://some.iiif.server/annos.json', {label: "Annotation List"});
      });
      it('dispatches the REQUEST_INFO_RESPONSE action', () => {
        store.dispatch(fetchAnnotationWorker({annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json'}));
        expect(store.getActions()).toEqual([
          {payload: {annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json'}, type: 'FETCH_ANNOTATION_STARTED'}]);
      });
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE', () => {
        store.dispatch(fetchAnnotationWorker({annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json'}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              {payload: {annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json'}, type: 'FETCH_ANNOTATION_STARTED'},
              {payload: {params: {annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json'},
                result: { label: "Annotation List" },
              },
              type: 'FETCH_ANNOTATION_DONE'}
            ]);
          });
      });
    });
    describe('annotation error response', () => {
      beforeEach(() => {
        fetchMock.get('*', () => {
          throw new Error("FetchError: invalid json response body at undefined reason: Unexpected end of JSON input")
        });
      });
      it('dispatches the REQUEST_INFO_RESPONSE and then RECEIVE_INFO_RESPONSE error', () => {
        store.dispatch(fetchAnnotationWorker({annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json'}))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions).toEqual([
              { annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json', type: 'FETCH_ANNOTATION_STARTED' },
              { error: new Error('invalid json response body at undefined reason: Unexpected end of JSON input'), infoId: 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/info.json', type: 'RECEIVE_INFO_RESPONSE_FAILURE' },
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
