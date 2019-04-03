import React, { Component } from 'react';
import ManifestoCanvas from '../utils/ManifestoCanvas';
import OSDViewer from '../containers/OpenSeadragonViewer';
import WindowCanvasNavigationControls from '../containers/WindowCanvasNavigationControls';

interface IWindowViewer {
  currentCanvases: any
  fetchAnnotationWorker: any
  fetchInfoResponseWorker: any
  infoResponses: any
  window: any
}
/**
 * Represents a WindowViewer in the mirador workspace. Responsible for mounting
 * OSD and Navigation
 */
export class WindowViewer extends Component<IWindowViewer> {
  /**
   * componentDidMount - React lifecycle method
   * Request the initial canvas on mount
   */
  public componentDidMount() {
    const { currentCanvases, fetchInfoResponseWorker, fetchAnnotationWorker } = this.props;

    if (!this.infoResponseIsInStore()) {
      currentCanvases.forEach((canvas) => {
        const manifestoCanvas = new ManifestoCanvas(canvas);
        const { imageInformationUri } = manifestoCanvas;
        if (imageInformationUri) {
          fetchInfoResponseWorker({infoId: imageInformationUri});
        }
        manifestoCanvas.annotationListUris.forEach((uri) => {
          fetchAnnotationWorker({annotationId: uri, canvasId: manifestoCanvas.canvas.id});
        });
      });
    }
  }

  /**
   * componentDidUpdate - React lifecycle method
   * Request a new canvas if it is needed
   */
  public componentDidUpdate(prevProps) {
    const {
      currentCanvases, window, fetchInfoResponseWorker, fetchAnnotationWorker,
    } = this.props;

    if (prevProps.window.view !== window.view
      || (prevProps.window.canvasIndex !== window.canvasIndex && !this.infoResponseIsInStore())
    ) {
      currentCanvases.forEach((canvas) => {
        const manifestoCanvas = new ManifestoCanvas(canvas);
        const { imageInformationUri } = manifestoCanvas;
        if (imageInformationUri) {
          fetchInfoResponseWorker({infoId: imageInformationUri});
        }
        manifestoCanvas.annotationListUris.forEach((uri) => {
          fetchAnnotationWorker({annotationId: uri, canvasId: manifestoCanvas.canvas.id, });
        });
      });
    }
  }

  /**
   * infoResponseIsInStore - checks whether or not an info response is already
   * in the store. No need to request it again.
   * @return [Boolean]
   */
  private infoResponseIsInStore() {
    const { currentCanvases } = this.props;
    const responses = this.currentInfoResponses();
    return responses.length === currentCanvases.length;
  }

  /**
   * currentInfoResponses - Selects infoResponses that are relevent to existing
   * canvases to be displayed.
   */
  private currentInfoResponses() {
    const { currentCanvases, infoResponses } = this.props;

    return currentCanvases.map(canvas => (
      infoResponses[new ManifestoCanvas(canvas).imageInformationUri]
    )).filter(infoResponse => (infoResponse !== undefined
      && infoResponse.isFetching === false
      && infoResponse.error === undefined));
  }

  /**
   * Return an image information response from the store for the correct image
   */
  private tileInfoFetchedFromStore() {
    const { currentCanvases } = this.props;

    const responses = this.currentInfoResponses()
      .map(infoResponse => infoResponse.json);
    // Only return actual tileSources when all current canvases have completed.
    if (responses.length === currentCanvases.length) {
      return responses;
    }
    return [];
  }

  /**
   * Renders things
   */
  public render() {
    const { window } = this.props;
    return (
      <>
        <OSDViewer
          tileSources={this.tileInfoFetchedFromStore()}
          windowId={window.id}
        >
          <WindowCanvasNavigationControls windowId={window.id} />
        </OSDViewer>
      </>
    );
  }
}
