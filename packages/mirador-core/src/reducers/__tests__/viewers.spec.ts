import {updateViewport} from '../../actions'
import {viewersReducer} from '../';

describe('viewers reducer', () => {
  it('should handle UPDATE_VIEWPORT', () => {
    expect(viewersReducer({
      abc123: {
        x: 1,
        y: 0,
        zoom: 1.0,
      },
      def456: {
        x: 1,
        y: 0,
        zoom: 1.0,
      },
    }, updateViewport({ windowId: 'abc123', x: 0, y: 1, zoom: 0.5, }))).toEqual({
      abc123: {
        x: 0,
        y: 1,
        zoom: 0.5,
      },
      def456: {
        x: 1,
        y: 0,
        zoom: 1.0,
      },
    });
  });
});
