import {IState, IWindows, IWorkspace} from "mirador-core-model"
import {getManifestTitle} from "."
import {useSelector} from "react-redux"

export const getIsWorkspaceAddVisible = () => {
  return useSelector((state: IState) => state.workspace.isWorkspaceAddVisible)
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

export const getWindowTitles = () => {
  return useSelector((state: IState) => {
    const result = {};
    return Object.keys(state.windows).forEach((windowId) => {
      result[windowId] = getManifestTitle(state, {windowId})
    })
  })
}

export const getWorkspaceType = () => {
  return useSelector((state: IState) => state.config.workspace.type)
}
