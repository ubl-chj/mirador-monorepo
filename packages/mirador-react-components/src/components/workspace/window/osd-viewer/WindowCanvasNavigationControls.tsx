import React, {ReactElement} from 'react';
import ViewerInfo from '../../../../containers/workspace/window/osd-viewer/ViewerInfo';
import ViewerNavigation from '../../../../containers/workspace/window/osd-viewer/ViewerNavigation';
import ZoomControls from '../../../../containers/workspace/window/osd-viewer/ZoomControls';
import ns from '../../../../config/css-ns';

interface IWindowCanvasNavigationControls {
  visible: boolean
  window: any
  zoomToWorld: Function
}
/**
 * Represents the viewer controls in the mirador workspace.
 */
export const WindowCanvasNavigationControls: React.FC<IWindowCanvasNavigationControls> = (props): ReactElement => {
  const {visible, window, zoomToWorld} = props;

  if (!visible) return (<></>);

  return (
    <div className={ns('canvas-nav')}>
      <ZoomControls windowId={window.id} zoomToWorld={zoomToWorld} />
      <ViewerNavigation window={window} />
      <ViewerInfo windowId={window.id} />
    </div>
  );
}

