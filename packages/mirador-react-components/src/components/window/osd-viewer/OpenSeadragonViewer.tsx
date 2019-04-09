import React, { Component } from 'react';
import OpenSeadragon from 'openseadragon';
import OpenSeadragonCanvasOverlay from '../../../utils/OpenSeadragonCanvasOverlay';
import Paper from '@material-ui/core/Paper';
import {ViewerNavigation} from "./ViewerNavigation"
import ns from '../../../config/css-ns';

interface IOpenSeadragonViewer {
  annotations: any
  canvasWorld: any
  classes: any
  label: string
  viewer: any
  t: any
  highlightedAnnotations: any
  selectedAnnotations: any
  tileSources: any
  updateViewport: any
  windowId: string
  canvases: any
  setCanvas: Function
  visible: boolean
  window: any
}
/**
 * Represents a OpenSeadragonViewer in the mirador workspace. Responsible for mounting
 * and rendering OSD.
 */
export class OpenSeadragonViewer extends Component<IOpenSeadragonViewer> {
  private osdCanvasOverlay: any
  private ref: any
  private updateCanvas: any
  private viewer: any

  private static annotationsMatch(currentAnnotations, prevAnnotations) {
    if (currentAnnotations && prevAnnotations && currentAnnotations.length === 0 && prevAnnotations.length === 0) return true;
    return currentAnnotations && currentAnnotations.some((annotation, index) => {
      if (!prevAnnotations[index]) {
        return false;
      }
      const newIds = annotation.resources.map(r => r.id);
      const prevIds = prevAnnotations[index].resources.map(r => r.id);
      return (annotation.id === prevAnnotations[index].id) && (newIds === prevIds);
    });
  }

  private static onCanvasClick(e) {
    e.preventDefaultAction = true
  }

  public constructor(props) {
    super(props);

    this.viewer = null;
    this.osdCanvasOverlay = null;
    // An initial value for the updateCanvas method
    this.updateCanvas = () => {};
    this.ref = React.createRef();
    this.onUpdateViewport = this.onUpdateViewport.bind(this);
    this.onViewportChange = this.onViewportChange.bind(this);
    this.zoomToWorld = this.zoomToWorld.bind(this);
  }

  public componentDidMount() {
    const { tileSources, viewer } = this.props;
    if (!this.ref.current) {
      return;
    }
    this.viewer = new OpenSeadragon({
      alwaysBlend: false,
      blendTime: 0.1,
      id: this.ref.current.id,
      navigatorPosition: 'BOTTOM_RIGHT',
      preserveImageSizeOnResize: true,
      preserveViewport: true,
      showNavigationControl: false,
      showNavigator: true,
    });

    this.osdCanvasOverlay = new OpenSeadragonCanvasOverlay(this.viewer);
    this.viewer.addHandler('update-viewport', this.onUpdateViewport);
    this.viewer.addHandler('canvas-exit', this.onViewportChange);
    this.viewer.addHandler('canvas-click', OpenSeadragonViewer.onCanvasClick);

    if (viewer) {
      this.viewer.viewport.panTo(viewer, false);
      this.viewer.viewport.zoomTo(viewer.zoom, viewer, false);
    }
    tileSources.forEach((tileSource, i) => this.addTileSource(tileSource, i));
  }

  /**
   * When the tileSources change, make sure to close the OSD viewer.
   * When the annotations change, reset the updateCanvas method to make sure
   * they are added.
   * When the viewport state changes, pan or zoom the OSD viewer as appropriate
   */
  public componentDidUpdate(prevProps) {
    console.log('did update');
    const {
      tileSources, highlightedAnnotations, selectedAnnotations
    } = this.props;
    const highlightsUpdated = !OpenSeadragonViewer.annotationsMatch(
      highlightedAnnotations, prevProps.highlightedAnnotations,
    );
    const selectionsUpdated = !OpenSeadragonViewer.annotationsMatch(
      selectedAnnotations, prevProps.selectedAnnotations,
    );

    if (highlightsUpdated || selectionsUpdated) {
      this.updateCanvas = () => {
        this.osdCanvasOverlay.clear();
        this.osdCanvasOverlay.resize();
        this.osdCanvasOverlay.canvasUpdate(() => {
          if (highlightsUpdated) {
            this.annotationsToContext(highlightedAnnotations, '#00BFFF');
          }
          if (selectionsUpdated) {
            this.annotationsToContext(selectedAnnotations, 'yellow');
          }
        });
      };
      this.viewer.forceRedraw();
    }
    if (!this.tileSourcesMatch(prevProps.tileSources)) {
      this.viewer.close();
      Promise.all(
        tileSources.map((tileSource, i) => this.addTileSource(tileSource, i)),
      ).then(() => {
        if (tileSources[0]) {
          this.zoomToWorld();
        }
      });
    }
  }

  public componentWillUnmount() {
    this.updateViewerLocation();
    this.viewer.removeAllHandlers();
  }

  private onUpdateViewport() {
    this.updateCanvas();
  }

  private onViewportChange(event) {
    const { updateViewport, windowId } = this.props;

    const { viewport } = event.eventSource;

    updateViewport({windowId,
      x: viewport.centerSpringX.target.value,
      y: viewport.centerSpringY.target.value,
      zoom: viewport.zoomSpring.target.value,
    });
  }

  private updateViewerLocation() {
    const { updateViewport, windowId } = this.props;

    const center = this.viewer.viewport.getCenter();
    updateViewport(windowId, {
      x: Math.round(center.x),
      y: Math.round(center.y),
      zoom: this.viewer.viewport.getZoom(),
    });
  }

  private annotationsToContext(annotations, color = 'yellow') {
    const { canvasWorld } = this.props;
    const context = this.osdCanvasOverlay.context2d;
    annotations && annotations.forEach((annotation) => {
      annotation.resources.forEach((resource) => {
        const offset = canvasWorld.offsetByCanvas(resource.targetId);
        const fragment = resource.fragmentSelector;
        fragment[0] += offset.x;
        context.strokeStyle = color;
        context.lineWidth = 10;
        context.strokeRect(...fragment);
      });
    });
  }

  private addTileSource(tileSource, i = 0) {
    const { canvasWorld } = this.props;
    return new Promise((resolve, reject) => {
      if (!this.viewer) {
        return;
      }
      this.viewer.addTiledImage({
        error: event => reject(event),
        fitBounds: new OpenSeadragon.Rect(
          ...canvasWorld.canvasToWorldCoordinates(i),
        ),
        success: event => resolve(event),
        tileSource,
      });
    });
  }

  private fitBounds(x?, y?, w?, h?, immediately: boolean = true) {
    this.viewer.viewport.fitBounds(
      new OpenSeadragon.Rect(x, y, w, h),
      immediately,
    );
  }

  /**
   * tileSourcesMatch - compares previous tileSources to current to determine
   * whether a refresh of the OSD viewer is needed.
   * @param  {Array} prevTileSources
   * @return {Boolean}
   */
  private tileSourcesMatch(prevTileSources) {
    const { tileSources } = this.props;
    return tileSources.some((tileSource, index) => {
      if (!prevTileSources[index]) {
        return false;
      }
      if (tileSource['@id'] === prevTileSources[index]['@id']) {
        return true;
      }
      return false;
    });
  }

  private zoomToWorld(immediately = true) {
    const { canvasWorld } = this.props;
    this.fitBounds(...canvasWorld.worldBounds(), immediately);
  }

  private zoomIn() {
    const center = this.viewer.viewport.getCenter();
    this.viewer.viewport.zoomTo(
      this.viewer.viewport.getZoom() * 2,
      center,
      false,
    );
  }

  private zoomOut() {
    const center = this.viewer.viewport.getCenter();
    this.viewer.viewport.zoomTo(
      this.viewer.viewport.getZoom() / 2,
      center,
      false,
    );
  }

  public render() {
    const {
      windowId, children, classes, label, t, canvases, setCanvas, visible, window
    } = this.props;
    const enhancedChildren = React.Children.map(children, (child: any) => (
      React.cloneElement(
        child,
        {
          zoomIn: this.zoomIn,
          zoomOut: this.zoomOut,
          zoomToWorld: this.zoomToWorld,
        },
      )
    ));

    return (
      <>
        <section
          aria-label={t('item', { label })}
          className={ns('osd-container')}
          id={`${windowId}-osd`}
          ref={this.ref}
        >
          <ViewerNavigation
            canvases={canvases}
            setCanvas={setCanvas}
            visible={visible}
            window={window}
          />
          <Paper className={classes.controls} elevation={0} square>
            { enhancedChildren }
          </Paper>
        </section>
      </>
    );
  }
}
