import { Dialog, DialogContent, DialogTitle, FormControl, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, {EventHandler, ReactElement} from 'react'
import {getDiscovery} from "../state/selectors"
import {updateConfig} from '@mirador/core'
import {useDispatch} from 'react-redux'
import {useListItemTextStyles} from '../hooks'
import {useTranslation} from 'react-i18next'

interface IIndexSelectionDialog {
  onClose: EventHandler<any>
  open: boolean,
}

export const IndexSelectionDialog: React.FC<IIndexSelectionDialog> = (props): ReactElement => {
  const discovery = getDiscovery()
  const {open, onClose} = props
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()
  const dispatch = useDispatch()

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

  const handleChange = (event) => {
    const currentIndex = event.target.value as string
    dispatch(updateConfig({
      discovery: {
        currentIndex
      }
    }))
  }

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
            onChange={handleChange}
            value={discovery.currentIndex}
          >
            {options}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}
