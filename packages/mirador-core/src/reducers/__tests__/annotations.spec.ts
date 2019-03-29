import { AnyAction, Middleware } from 'redux';
import {FETCH_ANNOTATION, fetchAnnotation} from '../../actions'
import configureStore, { MockStore } from 'redux-mock-store';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import {annotations} from '../';
import fetchMock from 'fetch-mock'

interface IState {
  foo: string;
  updating?: boolean;
  error?: Error;
}

interface IExt {
  dispatch: ThunkDispatch<IState, any, AnyAction>;
}

const initial: IState = { foo: 'test' };

describe('annotations response reducer test', () => {
  type StoreType = MockStore<IState> & IExt;
  let middleware: Middleware[] = [];
  let createMockStore: (initial: IState) => StoreType;
  let store: StoreType;

  beforeEach(() => {
    fetchMock.reset()
    middleware = [thunkMiddleware];
    createMockStore = configureStore(middleware);
    store = createMockStore(initial);
    fetchMock.get('*', { label: "Annotation List" });
  });

  it('info response reducer test', async () => {
    await store.dispatch(fetchAnnotation.action({annotationId: 'https://some.iiif.server/annos.json', canvasId: 'https://some.iiif.server/canvas.json'}));
    expect(fetchMock.called()).toBe(true)
    const [started, done] = store.getActions().filter(action =>
      action.type.includes(FETCH_ANNOTATION));

    const beforeState = store.getState();
    expect(beforeState).toEqual(initial);

    const startedState = annotations(beforeState, started);
    expect(startedState).toEqual({
      ...beforeState,
      updating: true
    });

    const doneState = annotations(startedState, done);
    expect(doneState).toEqual({
      ...startedState,
      'https://some.iiif.server/canvas.json': {
        'https://some.iiif.server/annos.json': {
          id: 'https://some.iiif.server/annos.json',
          json: {label: "Annotation List"}
        },
      },
      updating: false,
    });
  });
})
