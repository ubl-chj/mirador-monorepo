import React from 'react';
import PropTypes from 'prop-types';
import { Rnd } from 'react-rnd';
import ResizeObserver from 'react-resize-observer';
import Window from '../containers/Window';
import ns from '../config/css-ns';

/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
class WorkspaceElastic extends React.Component {
  /**
   */
  render() {
    const {
      workspace,
      windows,
      setWorkspaceViewportDimensions,
      setWorkspaceViewportPosition,
      updateWindowPosition,
      setWindowSize,
    } = this.props;

    const { viewportPosition } = workspace;
    const offsetX = workspace.width / 2;
    const offsetY = workspace.height / 2;

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <ResizeObserver
          onResize={(rect) => { setWorkspaceViewportDimensions(rect); }}
        />

        <Rnd
          default={{
            width: workspace.width,
            height: workspace.height,
          }}
          position={{
            x: -1 * viewportPosition.x - offsetX, y: -1 * viewportPosition.y - offsetY,
          }}
          enableResizing={{
            top: false,
            right: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          onDragStop={(e, d) => {
            setWorkspaceViewportPosition({ x: -1 * d.x - offsetX, y: -1 * d.y - offsetY });
          }}
          cancel={`.${ns('window')}`}
          className={ns('workspace')}
        >
          {
            Object.values(windows).map(window => (
              <Rnd
                key={window.id}
                size={{ width: window.width, height: window.height }}
                position={{ x: window.x + offsetX, y: window.y + offsetY }}
                bounds="parent"
                onDragStop={(e, d) => {
                  updateWindowPosition(window.id, { x: d.x - offsetX, y: d.y - offsetY });
                }}
                onResize={(e, direction, ref, delta, position) => {
                  setWindowSize(window.id, {
                    width: ref.style.width,
                    height: ref.style.height,
                    x: position.x - offsetX,
                    y: position.y - offsetY,
                  });
                }}
                dragHandleClassName={ns('window-top-bar')}
                className={
                  workspace.focusedWindowId === window.id ? ns('workspace-focused-window') : null
                }
              >
                <Window
                  window={window}
                />
              </Rnd>
            ))
          }
        </Rnd>
      </div>
    );
  }
}

WorkspaceElastic.propTypes = {
  setWorkspaceViewportPosition: PropTypes.func.isRequired,
  setWorkspaceViewportDimensions: PropTypes.func.isRequired,
  windows: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  workspace: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateWindowPosition: PropTypes.func.isRequired,
  setWindowSize: PropTypes.func.isRequired,
};

export default WorkspaceElastic;
