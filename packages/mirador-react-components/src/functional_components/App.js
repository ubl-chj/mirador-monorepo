import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Fullscreen from 'react-fullscreen';
import { I18nextProvider } from 'react-i18next';
import WorkspaceAdd from '../containers/WorkspaceAdd';
import WorkspaceControlPanel from '../containers/WorkspaceControlPanel';
import Workspace from '../containers/Workspace';
import ns from '../config/css-ns';
import i18n from '../i18n';

/**
 *
 * @param props
 * @returns {*}
 * @constructor
 */
export const App = (props) => {
  const { language } = props;
  const prevLanguage = useRef();

  useEffect(() => {
    i18n.changeLanguage(language);
    if (prevLanguage.current !== language) {
      i18n.changeLanguage(language);
    }
    prevLanguage.current = language;
  });
  const {
    isFullscreenEnabled, setWorkspaceFullscreen,
    isWorkspaceAddVisible, isWorkspaceControlPanelVisible, theme, translations,
  } = props;

  Object.keys(translations).forEach((lng) => {
    i18n.addResourceBundle(lng, 'translation', translations[lng], true, true);
  });

  return (
    <div>
      <I18nextProvider i18n={i18n}>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
          <Fullscreen
            enabled={isFullscreenEnabled}
            onChange={setWorkspaceFullscreen}
          >
            {
              isWorkspaceAddVisible
                ? <WorkspaceAdd />
                : <Workspace />
            }
          </Fullscreen>
          {
            isWorkspaceControlPanelVisible
            && <WorkspaceControlPanel />
          }
        </MuiThemeProvider>
      </I18nextProvider>
    </div>
  );
};

App.propTypes = {
  language: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  translations: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  isFullscreenEnabled: PropTypes.bool,
  setWorkspaceFullscreen: PropTypes.func.isRequired,
  isWorkspaceAddVisible: PropTypes.bool,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
};

App.defaultProps = {
  isFullscreenEnabled: false,
  isWorkspaceAddVisible: false,
};
