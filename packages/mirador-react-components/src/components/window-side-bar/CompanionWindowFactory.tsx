import React, {ReactElement} from 'react';
import ThumbnailNavigation from '../../containers/window-side-bar/ThumbnailNavigation';
import WindowSideBarAnnotationsPanel from '../../containers/window-side-bar/WindowSideBarAnnotationsPanel';
import WindowSideBarCanvasPanel from '../../containers/window-side-bar/WindowSideBarCanvasPanel';
import WindowSideBarInfoPanel from '../../containers/window-side-bar/WindowSideBarInfoPanel';

interface ICompanionWindowFactory {
  content: string
  id: string
  windowId: string
}
/**
 * Render a companion window using the appropriate component for the content
 */
export const CompanionWindowFactory: React.FC<ICompanionWindowFactory> = (props): ReactElement => {
  const { content, windowId, id } = props;

  switch (content) {
    case 'info':
      return (<WindowSideBarInfoPanel id={id} windowId={windowId} />);
    case 'canvas_navigation':
      return (<WindowSideBarCanvasPanel id={id} windowId={windowId} />);
    case 'annotations':
      return <WindowSideBarAnnotationsPanel id={id} windowId={windowId} />;
    case 'thumbnail_navigation':
      return <ThumbnailNavigation id={id} windowId={windowId} />;
    default:
      return (<></>);
  }
}
