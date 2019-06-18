import {IState, IWindows} from "mirador-core-model"
import {getManifestTitle} from "."
import {useSelector} from "react-redux"

export const getIsWorkspaceAddVisible = (): boolean => {
  return useSelector((state: IState) => state.workspace.isWorkspaceAddVisible)
}

export const getIsWorkspaceControlPanelVisible = (): boolean => {
  return useSelector((state: IState) => state.config.workspaceControlPanel.enabled)
}

export const getIsWorkspaceEnabled = (): boolean => {
  return useSelector((state: IState) => state.workspace.enabled)
}

export const getConfig = () => {
  return useSelector((state: IState) => state.config)
}

export const getManifests = () => {
  return useSelector((state: IState) => state.manifests)
}

export const getCurrentLanguage = (): string => {
  return useSelector((state: IState) => state.config.language)
}

export const getWorkspaceEnabled = (): boolean => {
  return useSelector((state: IState) => state.workspace.enabled)
}

export const getFocusedWindowId = (): string => {
  return useSelector((state: IState) => state.workspace.focusedWindowId)
}

const getLanguagesFromConfigWithCurrent = (state): any => {
  const {availableLanguages} = state.config;
  return Object.keys(availableLanguages).map(key => ({
    label: availableLanguages[key],
    locale: key,
  }));
}

export const getLanguages = () => {
  return useSelector((state: IState) => getLanguagesFromConfigWithCurrent(state))
}

export const getTheme = () => {
  return useSelector((state: IState) => state.config.theme)
}

export const getWindows = (): IWindows => {
  return useSelector((state: IState) => state.windows)
}

const getManifestTitles = (state): any => {
  return Object.keys(state.windows).reduce((object, windowId) => {
    const title = getManifestTitle(state, {windowId})
    return {
      ...object,
      [windowId]: title
    }
  }, {})
}

export const getWindowTitles = (): {} => {
  return useSelector((state: IState) => getManifestTitles(state))
}

export const getWorkspaceType = () => {
  return useSelector((state: IState) => state.config.workspace.type)
}
