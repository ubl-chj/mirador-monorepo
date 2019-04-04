import React, {ReactElement} from 'react';
import CompanionArea from '../../../containers/workspace/window/companion-area/CompanionArea';
import GalleryView from '../../../containers/workspace/window/GalleryView';
import WindowSideBar from '../../../containers/workspace/window/side-bar/WindowSideBar';
import WindowViewer from '../../../containers/workspace/window/WindowViewer';

import ns from '../../../config/css-ns';

interface IPrimaryWindow {
  manifest: any
  sideBarOpen: boolean
  window: any
}
/**
 * WindowMiddleContent - component that renders the "middle" area of the
 * Mirador Window
 */
export const PrimaryWindow: React.FC<IPrimaryWindow> = (props): ReactElement => {
  const { manifest, window } = props;
  /**
   * renderViewer
   *
   * @return {(String|null)}
   */
  const renderViewer = () => {
    if (manifest && manifest.updating === false) {
      if (window.view === 'gallery') {
        return (
          <GalleryView
            manifest={manifest}
            window={window}
          />
        );
      }
      return (
        <WindowViewer
          window={window}
        />
      );
    }
    return null;
  }

  return (
    <div className={ns('primary-window')}>
      <WindowSideBar windowId={window.id} />
      <CompanionArea position="left" windowId={window.id}/>
      {renderViewer()}
    </div>
  );
}
