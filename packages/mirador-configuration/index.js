import deepmerge from 'deepmerge'
import * as discovery from './discovery'

const rootConfig = {
  canvasNavigation: {
    height: 50,
    width: 50,
  },
  discovery: {
    currentIndex: 'm4',
    indices: {},
  },
  id: 'app',
  language: 'en',
  availableLanguages: {
    de: 'Deutsch',
    en: 'English',
  },
  theme: {
    palette: {
      primary: {
        main: '#071e29',
      },
      secondary: {
        light: '#616161',
        main: '#0044ff',
      },
      error: {
        main: '#b00020',
      },
    },
    paper: {
      width: 300,
    },
    typography: {
      useNextVariants: true
    },
  },
  thumbnailNavigation: {
    'defaultPosition': 'off',
    'height': 100
  },
  translations: {
  },
  window: {
    defaultView: 'single',
  },
  windows: [],
  workspace: {
    type: 'mosaic'
  },
  workspaceControlPanel: {
    enabled: true,
  }
}

export const localConfig = deepmerge(rootConfig, discovery)
