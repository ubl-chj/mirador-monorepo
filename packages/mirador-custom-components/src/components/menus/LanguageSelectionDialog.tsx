import { Dialog, DialogContent, DialogTitle, FormControl, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, {EventHandler, ReactElement} from 'react'
import {getCurrentLanguage, getLanguages, updateConfig} from "@mirador/core"
import {useDispatch} from 'react-redux'
import {useListItemTextStyles} from '../../hooks'
import {useTranslation} from 'react-i18next'

interface ILanguageSelectionDialog {
  onClose: EventHandler<any>
  open: boolean,
}

export const LanguageSelectionDialog: React.FC<ILanguageSelectionDialog> = (props): ReactElement => {
  const {open, onClose} = props
  const currentLanguage = getCurrentLanguage()
  const languages = getLanguages()
  const dispatch = useDispatch()
  const classes: any = useListItemTextStyles
  const {t} = useTranslation()

  const buildLanguageOptions = (languages): JSX.Element[] => {
    return languages.map((language) =>
      <MenuItem
        button={true}
        component='li'
        key={language.locale} value={language.locale}
      >
        <ListItemText classes={{primary: classes.primary}}>{language.label}</ListItemText>
      </MenuItem>)
  }

  return (
    <Dialog
      id="languages"
      onClose={onClose}
      open={open}
    >
      <DialogTitle id="form-dialog-title">{t('language')}</DialogTitle>
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
              id: 'languageLocale',
              name: 'languages',
            }}
            onChange={(event): void => {
              const language = event.target.value as string
              dispatch(updateConfig({
                language,
              }));
            }}
            value={currentLanguage}
          >
            {buildLanguageOptions(languages)}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}
