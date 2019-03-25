declare module 'Models' {
  export interface IManifest {
    [manifestId: string]: {
      id: string,
      isFetching: boolean,
    },
  }

  export interface IWindow {
    [windowId: string]: {
      displayAllAnnotations: boolean
      sideBarOpen: boolean
      companionWindowIds: []
      selectedAnnotations: {}
      thumbnailNavigationId: string
    },
  }

  interface ICompanionWindow {
    [windowId: string]: {
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
}
