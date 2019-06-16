import React, {ReactElement} from 'react';
import CompanionWindowFactory from '../../../containers/window/companion-area/CompanionWindowFactory';
import {makeStyles} from '@material-ui/styles'
import ns from '../../../config/css-ns';

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

const useStyles = makeStyles(theme => ({
  horizontal: {
    flexDirection: 'column',
    width: '100%',
  },
  root: {
    display: 'flex',
    minHeight: 0,
    position: 'relative',
  },
  toggle: {
    backgroundColor: (theme as any).palette.background.paper,
    border: `1px solid ${(theme as any).palette.primary.dark}`,
    borderRadius: 0,
    left: '100%',
    marginTop: '1rem',
    padding: 2,
    position: 'absolute',
    width: '1rem',
    zIndex: (theme as any).zIndex.drawer,
  },
}));

export const CompanionArea: React.FC<ICompanionArea> = (props): ReactElement => {
  const classes = useStyles({})

  const areaLayoutClass = () => {
    const {position} = props;

    return (position === 'bottom' || position === 'far-bottom') ? classes.horizontal : null;
  }

  const {companionWindows, position, sideBarOpen, windowId} = props;

  return (
    <div className={[classes.root, areaLayoutClass(), ns(`companion-area-${position}`)].join(' ')}>
      <div className={[ns('companion-windows'), areaLayoutClass()].join(' ')}
        style={{ display: (position !== 'left' || sideBarOpen) ? 'flex' : 'none' }}
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
