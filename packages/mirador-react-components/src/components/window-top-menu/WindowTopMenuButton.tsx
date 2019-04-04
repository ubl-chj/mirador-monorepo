import React, {ReactElement, useState} from 'react';
import MiradorMenuButton from '../../containers/MiradorMenuButton';
import MoreVertIcon from '@material-ui/icons/MoreVertSharp';
import WindowTopMenu from '../../containers/window-top-menu/WindowTopMenu';
import {makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"

interface IWindowTopMenuButton {
  className: string
  windowId: string
}

const useStyles = makeStyles(theme => ({
  ctrlBtnSelected: {
    backgroundColor: theme.palette.action.selected,
  },
}));

export const WindowTopMenuButton: React.FC<IWindowTopMenuButton> = (props): ReactElement => {
  const [anchorEl, setAnchorEl] = useState()
  const classes = useStyles()
  const {t} = useTranslation()
  const { windowId } = props;

  const handleMenuClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <MiradorMenuButton
        aria-haspopup="true"
        aria-label={t('windowMenu')}
        aria-owns={anchorEl ? `window-menu_${windowId}` : undefined}
        className={anchorEl ? classes.ctrlBtnSelected : null}
        color="inherit"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </MiradorMenuButton>
      <WindowTopMenu
        anchorEl={anchorEl}
        handleClose={handleMenuClose}
        windowId={windowId}
      />
    </>
  );
}
