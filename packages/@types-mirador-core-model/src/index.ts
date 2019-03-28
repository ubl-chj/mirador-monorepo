import {ISequence, LanguageMap} from "manifesto"

export interface IConfig {
  availableLanguages?: {
  }
  canvasNavigation?: {
    height: number
    width: number
  }
  companionWindows?: {
    defaultPosition: string
  }
  discovery?: {}
  id?: string
  language?: string
  theme?: {
    palette: {}
    paper: {}
    typography: {}
  }
  thumbnailNavigation?: {
    defaultPosition: string
    height: number
    width: number
  }
  translations?: {}
  window?: {
    allowClose: boolean
    allowMaximize: boolean
    defaultView: string
  }
  windows?: [{
    loadedManifest: string
    thumbnailNavigationPosition: string
  }]
  workspace?: {
    type: string
  }
  workspaceControlPanel?: {
    enabled: boolean
  }
}
export interface IInfoRespone {
  [infoId: string]: {
    error: {}
    id: string,
    isFetching: boolean,
    json: {}
  },
}

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

export interface ICompanionWindow {
  [windowId: string]: {
    content: string
    id: string
    position: string
    thumbnailNavigationId: string
  },
}

export interface IViewer {
  [windowId: string]: {
    x: number
    y: number
    zoom: number
  },
}

export interface IWorkspace {
  exposeModeOn: boolean
  height: number
  isWorkspaceAddVisible: boolean
  isFullscreenEnabled: boolean
  layout: {
    direction: string,
    first: string,
    second: string
  }
  showZoomControls: boolean
  viewportPosition: {
    x: number
    y: number
  }
  width: number
}

export interface IWindowsReducer {
  windows: IWindow
  companionWindows: ICompanionWindow
}

export interface ICompanionWindowsReducer {
  windows: IWindow
  companionWindows: ICompanionWindow
}

