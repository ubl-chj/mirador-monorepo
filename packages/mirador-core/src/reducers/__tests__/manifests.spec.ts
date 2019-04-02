import { AnyAction, Middleware } from 'redux';
import {FETCH_MANIFEST, fetchManifestWorker} from '../../actions'
import configureStore, { MockStore } from 'redux-mock-store';
import thunkMiddleware, { ThunkDispatch } from 'redux-thunk';
import fetchMock from 'fetch-mock'
import {manifests} from '../';

interface IState {
  foo: string;
  updating?: boolean;
  error?: Error;
}

interface IExt {
  dispatch: ThunkDispatch<IState, any, AnyAction>;
}

const initial: IState = { foo: 'test' };

describe('manifest reducer test', () => {
  type StoreType = MockStore<IState> & IExt;
  let middleware: Middleware[] = [];
  let createMockStore: (initial: IState) => StoreType;
  let store: StoreType;

  beforeEach(() => {
    middleware = [thunkMiddleware];
    createMockStore = configureStore(middleware);
    store = createMockStore(initial);
    fetchMock.get('*', { label: 'Some Manifest' });
  });

  it('manifests reducer test', async () => {
    await store.dispatch(fetchManifestWorker({manifestId: 'https://www.nga.gov/content/ngaweb/api/v1/iiif/presentation/manifest.json?cultObj:id=25518'}));
    expect(fetchMock.called()).toBe(true)
    const [started, done] = store.getActions().filter(action =>
      action.type.includes(FETCH_MANIFEST));

    const beforeState = store.getState();
    expect(beforeState).toEqual(initial);

    const startedState = manifests(beforeState, started);
    expect(startedState).toEqual({
      ...beforeState,
      updating: true
    });

    const doneState = manifests(startedState, done);
    expect(doneState).toEqual({
      ...startedState,
      'https://www.nga.gov/content/ngaweb/api/v1/iiif/presentation/manifest.json?cultObj:id=25518': {
        id: 'https://www.nga.gov/content/ngaweb/api/v1/iiif/presentation/manifest.json?cultObj:id=25518',
        json: {
          label: 'Some Manifest'
        },
        updating: false,
      },
      updating: false,
    });
  });
})
