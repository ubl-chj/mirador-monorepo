import React, {EventHandler, ReactElement} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {updateConfig} from '@mirador/core'
import {useListItemTextStyles} from "../../hooks"

import {useTranslation} from 'react-i18next'

interface IWorkspaceSelectionDialog {
  onClose: EventHandler<any>
  open: boolean,
  updateConfig: typeof updateConfig,
  workspaceType: string,
}

export const WorkspaceSelectionDialog: React.FC<IWorkspaceSelectionDialog> = (props): ReactElement => {
  const {open, onClose, workspaceType, updateConfig} = props
  const workspaceOptions = ['elastic', 'mosaic']
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()

  const buildOptions = (): JSX.Element[] => {
    return workspaceOptions.map((opt) =>
      <MenuItem
        button={true}
        key={opt}
        value={opt}>
        <ListItemText classes={{primary: classes.primary}}>{t(opt)}</ListItemText>
      </MenuItem>
    )
  }

  return (
    <Dialog
      id="workspace-settings"
      onClose={onClose}
      open={open}
    >
      <DialogTitle id="workspace-type">{t('workspaceSelectionTitle')}</DialogTitle>
      <DialogContent>
        <FormControl>
          <Select
            MenuProps={{
              anchorOrigin: {
                horizontal: "left",
                vertical: "bottom",
              },
              getContentAnchorEl: null,
            }}
            inputProps={{
              id: 'workspace-type',
              name: 'workspace',
            }}
            onChange={(event) => {
              updateConfig({
                workspace: {
                  type: event.target.value,
                },
              });
            }}
            value={workspaceType}
          >
            {buildOptions()}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}
