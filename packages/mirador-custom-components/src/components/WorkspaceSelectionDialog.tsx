import React, {EventHandler} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {updateConfig} from '@mirador/core'

interface IWorkspaceSelectionDialog {
  onClose: EventHandler<any>
  open: boolean,
  t: Function,
  updateConfig: typeof updateConfig,
  workspaceType: string,
}

export const WorkspaceSelectionDialog: React.FC<IWorkspaceSelectionDialog> = (props) => {
    const {open, onClose, workspaceType, updateConfig, t} = props
    const workspaceOptions = ['elastic', 'mosaic']

    const buildOptions = () => {
     return workspaceOptions.map((opt) => <MenuItem key={opt} value={opt}>{t(opt)}</MenuItem>)
    }

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
            {buildOptions()}
          </Select>
          </FormControl>
        </DialogContent>
    </Dialog>
  )
}
