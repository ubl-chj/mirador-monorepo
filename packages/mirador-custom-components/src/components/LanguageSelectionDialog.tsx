import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

interface ILanguageSelectionDialog {
  currentLanguage: string,
  languages: {
    label: string,
    locale: string
  }
  onClose: any
  open: boolean,
  t: Function,
  updateConfig: Function
}

const buildLanguageOptions = (languages) => {
 return languages.map((language) => <MenuItem key={language.locale} value={language.locale}>{language.label}</MenuItem>)
}

export const LanguageSelectionDialog: React.FC<ILanguageSelectionDialog> = (props) => {
  const {currentLanguage, open, onClose, languages, t, updateConfig} = props
  return (
    <Dialog
      id="languages"
      open={open}
      onClose={onClose}
    >
      <DialogTitle id="form-dialog-title">{t('language')}</DialogTitle>
      <DialogContent>
        <FormControl>
          <Select
            value={currentLanguage}
            onChange={(event) => {
              updateConfig({
                language: event.target.value,
              });
            }}
            inputProps={{
              name: 'languages',
              id: 'languageLocale',
            }}
          >
            {buildLanguageOptions(languages)}
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  )
}
