import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface IWorkspaceSelectionDialog {
  onClose: any
  open: boolean,
  updateConfig: Function,
  workspaceType: string,
  t: Function,
}

export const WorkspaceSelectionDialog: React.FC<IWorkspaceSelectionDialog> = (props) => {
    const {open, onClose, workspaceType, updateConfig, t} = props
    return (
      <Dialog
        id="workspace-settings"
        open={open}
        onClose={onClose}
      >
        <DialogTitle id="workspace-type">{t('workspaceSelectionTitle')}</DialogTitle>
        <DialogContent>
          <FormControl>
          <Select
            MenuProps={{
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "left",
              }
            }}
            value={workspaceType}
            onChange={(event) => {
              updateConfig({
                workspace: {
                  type: event.target.value,
                },
              });
            }}
            inputProps={{
              name: 'workspace',
                id: 'workspace-type',
            }}
          >
            <MenuItem value="elastic">{t('elastic')}</MenuItem>
            <MenuItem value="mosaic">{t('mosaic')}</MenuItem>
          </Select>
          </FormControl>
        </DialogContent>
    </Dialog>
  )
}
