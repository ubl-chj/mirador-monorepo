import Annotation from '../../utils//Annotation';
import CanvasWorld from '../../utils/CanvasWorld';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonCanvasOverlay from '../../utils/OpenSeadragonCanvasOverlay';
import { OpenSeadragonViewer } from '../window/osd-viewer/OpenSeadragonViewer';
import React from 'react';

import { shallow } from 'enzyme';
jest.mock('openseadragon');
jest.mock('../../utils/OpenSeadragonCanvasOverlay');

describe('OpenSeadragonViewer', () => {
  let wrapper;
  let updateViewport;
  beforeEach(() => {
    OpenSeadragon.mockClear();
    // OpenSeadragonCanvasOverlay.mockClear();

    updateViewport = jest.fn();

    wrapper = shallow(
      <OpenSeadragonViewer
        annotations={{}}
        canvasWorld={new CanvasWorld([])}
        classes={{ controls: 'controls' }}
        label={null}
        t={k => k}
        tileSources={[{
          '@id': 'http://foo',
          height: 200,
          width: 100,
        }, {
          '@id': 'http://bar',
          height: 201,
          width: 150,
        }]}
        updateViewport={updateViewport}
        viewer={null}
        windowId="base"
      >
        <div className="foo" />
      </OpenSeadragonViewer>,
    );
  });
  it('renders the component', () => {
    expect(wrapper.find('.mirador-osd-container').length).toBe(1);
  });
  it('renders child components enhanced with additional props', () => {
    expect(wrapper.find('.foo').length).toBe(1);
    expect(wrapper.find('.foo').props()).toEqual(expect.objectContaining({
      zoomToWorld: wrapper.instance().zoomToWorld,
    }));
  });
  it('renders viewer controls', () => {
    expect(wrapper.find('.controls').length).toBe(1);
  });
  describe('tileSourcesMatch', () => {
    it('when they do not match', () => {
      expect(wrapper.instance().tileSourcesMatch([])).toBe(false);
    });
    it('when the @ids do match', () => {
      expect(wrapper.instance().tileSourcesMatch([{ '@id': 'http://foo' }])).toBe(true);
    });
  });
  describe('addTileSource', () => {
    it('calls addTiledImage asynchronously on the OSD viewer', async () => {
      wrapper.instance().addTileSource({}).then((event) => {
        expect(event).toBe('event');
      });
    });
    it('when a viewer is not available, returns an unresolved Promise', () => {
      expect(wrapper.instance().addTileSource({})).toEqual(expect.any(Promise));
    });
  });
  describe('fitBounds', () => {
    it('calls OSD viewport.fitBounds with provided x, y, w, h', () => {
      wrapper.instance().viewer = {
        viewport: {
          fitBounds: jest.fn(),
        },
      };
      wrapper.instance().fitBounds(1, 2, 3, 4);
      expect(
        wrapper.instance().viewer.viewport.fitBounds,
      ).toHaveBeenCalledWith(expect.any(OpenSeadragon.Rect), true);
    });
  });

  describe('zoomToWorld', () => {
    it('uses fitBounds with the existing CanvasWorld', () => {
      const fitBounds = jest.fn();
      wrapper.instance().fitBounds = fitBounds;
      wrapper.instance().zoomToWorld();
      expect(fitBounds).toHaveBeenCalledWith(0, 0, 0, Infinity, true);
    });
  });

  describe('componentDidMount', () => {
    let panTo;
    let zoomTo;
    let addHandler;
    beforeEach(() => {
      panTo = jest.fn();
      zoomTo = jest.fn();
      addHandler = jest.fn();

      wrapper = shallow(
        <OpenSeadragonViewer
          annotations={{}}
          canvasWorld={new CanvasWorld([])}
          classes={{ controls: 'controls' }}
          label={null}
          t={k => k}
          tileSources={[{ '@id': 'http://foo' }]}
          updateViewport={updateViewport}
          viewer={{ x: 1, y: 0, zoom: 0.5 }}
          windowId="base"
        >
          <div className="foo" />
        </OpenSeadragonViewer>,
      );

      wrapper.instance().ref = { current: true };

      OpenSeadragon.mockImplementation(() => ({
        addHandler,
        addTiledImage: jest.fn().mockResolvedValue('event'),
        viewport: { panTo, zoomTo },
      }));
    });

    it('calls the OSD viewport panTo and zoomTo with the component state', () => {
      wrapper.instance().componentDidMount();

      expect(addHandler).toHaveBeenCalledWith('viewport-change', expect.anything());

      expect(panTo).toHaveBeenCalledWith(
        { x: 1, y: 0, zoom: 0.5 }, false,
      );
      expect(zoomTo).toHaveBeenCalledWith(
        0.5, { x: 1, y: 0, zoom: 0.5 }, false,
      );
    });

    it('sets up a OpenSeadragonCanvasOverlay', () => {
      wrapper.instance().componentDidMount();
      expect(OpenSeadragonCanvasOverlay).toHaveBeenCalledTimes(2);
    });

    it('sets up a listener on update-viewport', () => {
      wrapper.instance().componentDidMount();
      expect(addHandler).toHaveBeenCalledWith('update-viewport', expect.anything());
    });
  });

  describe('componentDidUpdate', () => {
    it('calls the OSD viewport panTo and zoomTo with the component state and forces a redraw', () => {
      const panTo = jest.fn();
      const zoomTo = jest.fn();
      const forceRedraw = jest.fn();

      wrapper.instance().viewer = {
        forceRedraw,
        viewport: {
          centerSpringX: { target: { value: 10 } },
          centerSpringY: { target: { value: 10 } },
          panTo,
          zoomSpring: { target: { value: 1 } },
          zoomTo,
        },
      };

      wrapper.setProps({ viewer: { x: 0.5, y: 0.5, zoom: 0.1 } });
      wrapper.setProps({ viewer: { x: 1, y: 0, zoom: 0.5 } });

      expect(panTo).toHaveBeenCalledWith(
        { x: 1, y: 0, zoom: 0.5 }, false,
      );
      expect(zoomTo).toHaveBeenCalledWith(
        0.5, { x: 1, y: 0, zoom: 0.5 }, false,
      );
      expect(forceRedraw).toHaveBeenCalled();
    });

    it('sets up canvasUpdate to add annotations to the canvas and forces a redraw', () => {
      const clear = jest.fn();
      const resize = jest.fn();
      const canvasUpdate = jest.fn();
      const forceRedraw = jest.fn();

      wrapper.instance().osdCanvasOverlay = {
        canvasUpdate,
        clear,
        resize,
      };

      wrapper.instance().viewer = { forceRedraw };

      wrapper.setProps(
        {
          annotations: [
            new Annotation({ '@id': 'foo', resources: [{ foo: 'bar' }] }, {target: 'whatever'}),
          ],
        },
      );
      wrapper.setProps(
        {
          annotations: [
            new Annotation({ '@id': 'foo', resources: [{ foo: 'bar' }] }, {target: 'whatever'}),
          ],
        },
      );
      wrapper.setProps(
        {
          annotations: [
            new Annotation({ '@id': 'bar', resources: [{ foo: 'bar' }] }, {target: 'whatever'}),
          ],
        },
      );
      wrapper.instance().updateCanvas();
      expect(clear).toHaveBeenCalledTimes(1);
      expect(resize).toHaveBeenCalledTimes(1);
      expect(canvasUpdate).toHaveBeenCalledTimes(1);
      expect(forceRedraw).toHaveBeenCalled();
    });
  });

  describe('onViewportChange', () => {
    it('translates the OSD viewport data into an update to the component state', () => {
      wrapper.instance().onViewportChange({
        eventSource: {
          viewport: {
            centerSpringX: { target: { value: 1 } },
            centerSpringY: { target: { value: 0 } },
            zoomSpring: { target: { value: 0.5 } },
          },
        },
      });

      expect(updateViewport).toHaveBeenCalledWith(
        { windowId: 'base', x: 1, y: 0, zoom: 0.5 },
      );
    });
  });

  describe('onUpdateViewport', () => {
    it('fires updateCanvas', () => {
      const updateCanvas = jest.fn();
      wrapper.instance().updateCanvas = updateCanvas;
      wrapper.instance().onUpdateViewport();
      expect(updateCanvas).toHaveBeenCalledTimes(1);
    });
  });

  describe('annotationsToContext', () => {
    it('converts the annotations to canvas', () => {
      const strokeRect = jest.fn();
      wrapper.instance().osdCanvasOverlay = {
        context2d: {
          strokeRect,
        },
      };

      const annotations = [
        new Annotation({ '@id': 'foo', resources: [{ on: 'www.example.com/#xywh=10,10,100,200' }] }, {target: 'whatever'}),
      ];
      wrapper.instance().annotationsToContext(annotations);
      const context = wrapper.instance().osdCanvasOverlay.context2d;
      expect(context.strokeStyle).toEqual('yellow');
      expect(context.lineWidth).toEqual(10);
      expect(strokeRect).toHaveBeenCalledWith(10, 10, 100, 200);
    });
  });
});
