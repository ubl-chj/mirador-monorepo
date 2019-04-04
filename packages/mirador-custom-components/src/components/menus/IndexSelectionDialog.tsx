import React, {EventHandler, ReactElement} from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import {updateConfig} from '@mirador/core'
import {useListItemTextStyles} from '../../hooks'
import {useTranslation} from 'react-i18next'

interface IIndexSelectionDialog {
  discovery: {
    currentIndex: string,
    indices: {}
  },
  onClose: EventHandler<any>
  open: boolean,
  updateConfig: typeof updateConfig
}

export const IndexSelectionDialog: React.FC<IIndexSelectionDialog> = (props): ReactElement => {
  const {discovery, open, onClose, updateConfig} = props
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()

  const getIndexNames = (): any => {
    const indices = discovery.indices
    const map = new Map()
    Object.keys(indices).forEach((key: any) => {
      map.set(key, indices[key].name)
    })
    return new Map([...map.entries()].sort())
  }
  const indexMap = getIndexNames()

  const buildSelectOptions = (): any => {
    return Array.from(indexMap, ([key, value]) =>
      <MenuItem
        button={false}
        component='li'
        key={key}
        value={key}
      >
        <ListItemText classes={{primary: classes.primary}}>{value}</ListItemText>
      </MenuItem>)
  }

  const options = buildSelectOptions()

  return (
    <Dialog
      id="indices"
      onClose={onClose}
      open={open}
    >
      <DialogTitle id="form-dialog-title">{t('indices')}</DialogTitle>
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
              id: 'index-native',
              name: 'currentIndex',
            }}
            onChange={(event) => {
              updateConfig({
                discovery: {
                  currentIndex: event.target.value,
                }
              });
            }}
            value={discovery.currentIndex}
          >
            {options}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}
