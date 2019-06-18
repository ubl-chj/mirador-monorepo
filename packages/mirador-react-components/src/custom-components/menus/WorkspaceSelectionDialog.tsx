import { Dialog, DialogContent, DialogTitle, FormControl, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, {EventHandler, ReactElement} from 'react';
import {getWorkspaceType, updateConfig} from "@mirador/core"
import {useDispatch} from 'react-redux'
import {useListItemTextStyles} from "../hooks"
import {useTranslation} from 'react-i18next'

interface IWorkspaceSelectionDialog {
  onClose: EventHandler<any>
  open: boolean,
}

export const WorkspaceSelectionDialog: React.FC<IWorkspaceSelectionDialog> = (props): ReactElement => {
  const {open, onClose} = props
  const workspaceType = getWorkspaceType()
  const workspaceOptions = ['elastic', 'mosaic']
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const buildOptions = (): JSX.Element[] => {
    return workspaceOptions.map((opt) =>
      <MenuItem
        button={true}
        component='li'
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
            onChange={(event): void => {
              const type = event.target.value as string
              dispatch(updateConfig({
                workspace: {
                  type,
                },
              }));
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
