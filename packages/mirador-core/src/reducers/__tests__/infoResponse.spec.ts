import { AnyAction, Middleware } from 'redux';
import {FETCH_INFO_RESPONSE, fetchInfoResponseWorker} from '../../actions'
import configureStore, { MockStore } from 'redux-mock-store';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import fetchMock from 'fetch-mock'
import {infoResponses} from '../';

interface IState {
  foo: string;
  updating?: boolean;
  error?: Error;
}

interface IExt {
  dispatch: ThunkDispatch<IState, any, AnyAction>;
}

const initial: IState = { foo: 'test' };

describe('info response reducer test', () => {
  type StoreType = MockStore<IState> & IExt;
  let middleware: Middleware[] = [];
  let createMockStore: (initial: IState) => StoreType;
  let store: StoreType;

  beforeEach(() => {
    fetchMock.reset()
    middleware = [thunkMiddleware];
    createMockStore = configureStore(middleware);
    store = createMockStore(initial);
    fetchMock.get('*', { protocol: "http://iiif.io/api/image" });
  });

  it('info response reducer test', async () => {
    await store.dispatch(fetchInfoResponseWorker({infoId: 'https://some.iiif.server/info.json'}));
    expect(fetchMock.called()).toBe(true)
    const [started, done] = store.getActions().filter(action =>
      action.type.includes(FETCH_INFO_RESPONSE));

    const beforeState = store.getState();
    expect(beforeState).toEqual(initial);

    const startedState = infoResponses(beforeState, started);
    expect(startedState).toEqual({
      ...beforeState,
      updating: true
    });

    const doneState = infoResponses(startedState, done);
    expect(doneState).toEqual({
      ...startedState,
      'https://some.iiif.server/info.json': {
        id: 'https://some.iiif.server/info.json',
        json: {
          protocol: "http://iiif.io/api/image"
        }
      },
      updating: false,
    });
  });
})
