import React, {ReactElement} from 'react';
import GalleryView from '../../containers/window/GalleryView';
import WindowSideBar from '../../containers/window/side-bar/WindowSideBar';
import WindowViewer from '../../containers/window/WindowViewer';

import ns from '../../config/css-ns';

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
      {renderViewer()}
    </div>
  );
}
