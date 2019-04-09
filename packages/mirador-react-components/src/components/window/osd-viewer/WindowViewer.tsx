import React, {ReactElement, useEffect} from 'react';
import ManifestoCanvas from '../../../utils/ManifestoCanvas';
import OSDViewer from '../../../containers/window/osd-viewer/OpenSeadragonViewer';
import WindowCanvasNavigationControls from '../../../containers/window/osd-viewer/WindowCanvasNavigationControls';
import {usePrevious} from '../../../hooks/usePrevious'

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
export const WindowViewer: React.FC<IWindowViewer> = (props): ReactElement => {

  const { currentCanvases, fetchInfoResponseWorker, fetchAnnotationWorker, infoResponses, window } = props;
  const prevWindow = usePrevious(window)

  const currentInfoResponses = () => {
    return currentCanvases.map(canvas => (
      infoResponses[new ManifestoCanvas(canvas).imageInformationUri]
    )).filter(infoResponse => (infoResponse !== undefined));
  }

  const infoResponseIsInStore = () => {
    const responses = currentInfoResponses();
    return responses.length === currentCanvases.length;
  }

  const doFetchActions = () => {
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

  useEffect(() => {
    if (!infoResponseIsInStore()
      || (prevWindow && prevWindow.view !== window.view)
      || (prevWindow && prevWindow.canvasIndex !== window.canvasIndex && !infoResponseIsInStore())) {
      doFetchActions()
    }
  }, [window])

  /**
   * Return an image information response from the store for the correct image
   */
  const tileInfoFetchedFromStore = () => {
    const responses = currentInfoResponses()
      .map(infoResponse => infoResponse.json);
    // Only return actual tileSources when all current canvases have completed.
    if (responses.length === currentCanvases.length) {
      return responses;
    }
    return [];
  }

  return (
    <>
      <OSDViewer
        tileSources={tileInfoFetchedFromStore()}
        windowId={window.id}
      >
        <WindowCanvasNavigationControls windowId={window.id} />
      </OSDViewer>
    </>
  );
}
