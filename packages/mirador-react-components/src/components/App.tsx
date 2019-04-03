import React, {ReactElement, useEffect, useRef} from 'react';

import Fullscreen from 'react-full-screen';
import { I18nextProvider } from 'react-i18next';
import {ThemeProvider} from '@material-ui/styles';
import WorkspaceArea from '../containers/WorkspaceArea';
import { createMuiTheme } from '@material-ui/core/styles';
import i18n from '@mirador/i18n';
import {setWorkspaceFullscreen} from '@mirador/core';

interface IApp {
  enabled: boolean
  i18n: typeof i18n
  isWorkspaceAddVisible: boolean
  isWorkspaceControlPanelVisible: boolean
  language: string
  setWorkspaceFullscreen: typeof setWorkspaceFullscreen
  theme: any
  translations: any

}

export const App: React.FC<IApp> = (props): ReactElement => {
  const { language, enabled, setWorkspaceFullscreen, theme, translations } = props;
  const prevLanguage: any = useRef();

  useEffect(() => {
    i18n.changeLanguage(language);
    if (prevLanguage.current !== language) {
      i18n.changeLanguage(language);
    }
    prevLanguage.current = language;
  });

  Object.keys(translations).forEach((lng) => {
    i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
  });
  return (
    <Fullscreen
      enabled={enabled}
      onChange={() => setWorkspaceFullscreen({enabled})}
    >
      <I18nextProvider i18n={this.i18n}>
        <ThemeProvider theme={createMuiTheme(theme)}>
          <WorkspaceArea />
        </ThemeProvider>
      </I18nextProvider>
    </Fullscreen>
  );
}
