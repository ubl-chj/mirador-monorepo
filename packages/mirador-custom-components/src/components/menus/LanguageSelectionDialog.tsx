import { Dialog, DialogContent, DialogTitle, FormControl, ListItemText, MenuItem, Select } from '@material-ui/core';
import React, {EventHandler, ReactElement} from 'react'
import {updateConfig} from '@mirador/core'
import {useListItemTextStyles} from '../../hooks'
import {useTranslation} from 'react-i18next'

interface ILanguageSelectionDialog {
  currentLanguage: string,
  languages: {
    label: string,
    locale: string
  }
  onClose: EventHandler<any>
  open: boolean,
  updateConfig: typeof updateConfig
}

export const LanguageSelectionDialog: React.FC<ILanguageSelectionDialog> = (props): ReactElement => {
  const {currentLanguage, open, onClose, languages, updateConfig} = props
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
              updateConfig({
                language,
              });
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
