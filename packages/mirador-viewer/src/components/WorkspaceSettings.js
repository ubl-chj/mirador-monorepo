import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import PropTypes from 'prop-types';

/**
 */
export class WorkspaceSettings extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  /**
   * Propagate theme palette type selection into the global state
   */
  handleThemeChange(event) {
    const { updateConfig } = this.props;

    updateConfig({
      theme: {
        palette: {
          type: event.target.value,
        },
      },
    });
  }

  /**
   * render
   * @return
   */
  render() {
    const {
      container, handleClose, open, children, theme, t,
    } = this.props;
    return (
      <Dialog id="workspace-settings" container={container} open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title" disableTypography>
          <Typography variant="h2">{t('settings')}</Typography>
        </DialogTitle>
        <DialogContent>
          {children}
          <FormControl>
            <InputLabel htmlFor="theme-simple">{t('theme')}</InputLabel>
            <Select
              MenuProps={{
                anchorOrigin: {
                  horizontal: 'left',
                  vertical: 'bottom',
                },
                getContentAnchorEl: null,
              }}
              value={theme.palette.type}
              onChange={this.handleThemeChange}
              inputProps={{
                id: 'theme-simple',
                name: 'theme',
              }}
            >
              <MenuItem value="light">{t('light')}</MenuItem>
              <MenuItem value="dark">{t('dark')}</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  }
}

WorkspaceSettings.propTypes = {
  children: PropTypes.node,
  container: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  updateConfig: PropTypes.func.isRequired,
};

WorkspaceSettings.defaultProps = {
  children: null,
  container: null,
  open: false,
  t: key => key,
};
