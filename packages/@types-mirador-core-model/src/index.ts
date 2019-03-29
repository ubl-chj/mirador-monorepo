import {ISequence, LanguageMap} from "manifesto"

export interface IState {
  annotations: any
  companionWindows: ICompanionWindow
  manifests: IManifest
  windows: IWindow
  config: IConfig
  viewers: IViewer
  workspace: IWorkspace
}
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
export interface IInfoResponse {
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
    companionWindowIds: any
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
  layout: {}
  showZoomControls: boolean
  viewportPosition: {
    x: number
    y: number
  }
  width: number
}

export interface IWindows{
  windows: IWindow
}

export interface ICompanionWindows {
  companionWindows: ICompanionWindow
}

export interface IManifests {
  manifests: IManifest
}

export interface IViewers {
  viewers: IViewer
}

export interface IInfoResponses {
  infoResponses: IInfoResponse
}
