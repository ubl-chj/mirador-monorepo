import React, {ReactElement} from 'react';
import { Rnd } from 'react-rnd';
import Window from '../../containers/window/Window';
import ns from '../../config/css-ns';

interface IWorkspaceElastic {
  setWindowSize: Function
  setWorkspaceViewportDimensions: Function
  setWorkspaceViewportPosition: Function
  workspace: any
  windows: any
  updateWindowPosition: any
}
/**
 * Represents a work area that contains any number of windows
 * @memberof Workspace
 * @private
 */
export const WorkspaceElastic: React.FC<IWorkspaceElastic> = (props): ReactElement => {
  const {
    workspace,
    windows,
    setWorkspaceViewportPosition,
    updateWindowPosition,
    setWindowSize,
  } = props;
  const offsetX = workspace.width / 2;
  const offsetY = workspace.height / 2;
  const {viewportPosition} = workspace
  return (
    <div style={{ height: '100%', position: 'relative', width: '100%' }}>
      <Rnd
        cancel={`.${ns('window')}`}
        className={ns('workspace')}
        default={{
          height: workspace.height,
          width: workspace.width,
          x: 0,
          y: 0
        }}
        enableResizing={{
          bottom: false,
          bottomLeft: false,
          bottomRight: false,
          left: false,
          right: false,
          top: false,
          topLeft: false,
          topRight: false,
        }}
        onDragStop={(e, d: any) => {
          const event = e;
          setWorkspaceViewportPosition({position: {x: -1 * d.x - offsetX, y: -1 * d.y - offsetY}});
        }}
        position={ {x: -1 * viewportPosition.x - offsetX, y: -1 * viewportPosition.y - offsetY}}
      >
        {
          Object.values(windows).map((window: any) => (
            <Rnd
              bounds="parent"
              className={
                workspace.focusedWindowId === window.id ? ns('workspace-focused-window') : null
              }
              dragHandleClassName={ns('window-top-bar')}
              key={window.id}
              onDragStop={(e, d: any) => {
                const event = e;
                updateWindowPosition({position: { x: d.x - offsetX, y: d.y - offsetY }, windowId: window.id});
              }}
              onResize={(e, direction, ref, delta, position) => {
                const event = e
                const dir = direction
                const delt = delta
                setWindowSize({
                  size: {
                    height: ref.style.height,
                    width: ref.style.width,
                    x: position.x - offsetX,
                    y: position.y - offsetY,
                  },
                  windowId: window.id,
                });
              }}
              position={{ x: window.x + offsetX, y: window.y + offsetY }}
              size={{ height: window.height, width: window.width }}
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
