import deepmerge from 'deepmerge'
import * as discovery from './discovery'

const rootConfig = {
  canvasNavigation: {
    height: 100,
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
        main: '#37474f',
      },
      secondary: {
        light: '#616161',
        main: '#0044ff',
        contrastText: '#ffcc00',
      },
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
    enabled: false,
  }
}

export const localConfig = deepmerge(rootConfig, discovery)
