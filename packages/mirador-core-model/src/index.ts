import {ISequence, LanguageMap} from "manifesto"

export interface IManifest {
  [manifestId: string]: {
    error: {}
    id: string,
    isFetching: boolean,
    json: {}
  },
}

export interface IManifesto {
  getDescription(): LanguageMap
  getLabel(): LanguageMap
  getLogo(): string
  getProperty(property: string): any
  options: {
    locale: {}
  }
  getSequences(): ISequence[]
}

export interface IWindow {
  [windowId: string]: {
    canvasIndex: number
    collectionIndex: number
    companionWindowIds: []
    displayAllAnnotations: boolean
    height: number
    id: string
    manifestId: string
    maximized: boolean
    rangeId: string
    rotation: any
    sideBarOpen: boolean
    selectedAnnotations: {}
    thumbnailNavigationId: string
    thumbnailNavigationPosition: string
    view: string
    width: number
    x: number
    y: number
  },
}

export interface IWorkspace {
  exposeModeOn: boolean,
  height: number
  isFullscreenEnabled: boolean
  isWorkspaceAddVisible: boolean
  viewportPosition: {
    x: number
    y: number
  }
  width: number
  layout: {
    direction: string
    first: string
    second: string
  }
}

export interface ICompanionWindow {
  [windowId: string]: {
    content: string
    position: string
    thumbnailNavigationId: string
  },
}

export interface IWindowsReducer {
  windows: IWindow
  companionWindows: ICompanionWindow
}

export interface ICompanionWindowsReducer {
  windows: IWindow
  companionWindows: ICompanionWindow
}

