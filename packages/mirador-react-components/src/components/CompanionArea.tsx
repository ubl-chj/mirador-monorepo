import React, {ReactElement} from 'react';
import CompanionWindowFactory from '../containers/CompanionWindowFactory';
import ns from '../config/css-ns';

interface ICompanionArea {
  classes: any
  companionWindows: any
  companionAreaOpen: boolean
  setCompanionAreaOpen: any
  position: string
  sideBarOpen: boolean
  t: any
  windowId: string
}
/** */
export const CompanionArea: React.FC<ICompanionArea> = (props): ReactElement => {
  /** */
  const areaLayoutClass = () => {
    const {classes, position} = props;

    return (position === 'bottom' || position === 'far-bottom') ? classes.horizontal : null;
  }

  const {classes, companionWindows, companionAreaOpen,
    position, sideBarOpen, windowId} = props;

  return (
    <div className={[classes.root, areaLayoutClass(), ns(`companion-area-${position}`)].join(' ')}>
      <div className={[ns('companion-windows'), areaLayoutClass()].join(' ')}
        style={{ display: companionAreaOpen && (position !== 'left' || sideBarOpen) ? 'flex' : 'none' }}
      >
        {
          companionWindows.map(cw => (
            <CompanionWindowFactory id={cw.id} key={cw.id} windowId={windowId} />
          ))
        }
      </div>
    </div>
  );
}
