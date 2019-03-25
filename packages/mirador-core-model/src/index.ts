export interface IManifest {
  [manifestId: string]: {
    error: {}
    id: string,
    isFetching: boolean,
    json: {}
  },
}

export interface IManifesto {
  getDescription(): Function
  getLabel(): Function
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

