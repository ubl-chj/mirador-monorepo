import React, {ReactElement} from 'react';
import ViewerInfo from '../../../containers/window/osd-viewer/ViewerInfo';
import ZoomControls from '../../../containers/window/osd-viewer/ZoomControls';
import ns from '../../../config/css-ns';

interface IWindowCanvasNavigationControls {
  visible: boolean
  windowId: string
  zoomToWorld: Function
}
/**
 * Represents the viewer controls in the mirador workspace.
 */
export const WindowCanvasNavigationControls: React.FC<any> = (props): ReactElement => {
  const {visible, windowId, zoomToWorld} = props;

  if (!visible) return (<></>);

  return (
    <>
      <div className={ns('canvas-nav')}>
        <ZoomControls windowId={windowId} zoomToWorld={zoomToWorld} />
        <ViewerInfo windowId={windowId} />
      </div>
    </>
  );
}

