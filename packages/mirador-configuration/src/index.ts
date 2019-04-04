import deepmerge from 'deepmerge'
import * as discovery from './discovery'

const rootConfig = {
  annotations: {
    motivations: ['oa:commenting', 'sc:painting']
  },
  availableLanguages: {
    de: 'Deutsch',
    en: 'English',
  },
  canvasNavigation: {
    height: 50,
    width: 50,
  },
  companionWindows: {
    defaultPosition: 'left'
  },
  discovery: {
    currentIndex: 'm4',
    indices: {},
  },
  id: 'app',
  language: 'en',
  theme: {
    palette: {
      action: {
        hover: '#d2e2ce59',
        selected: '#2b691c59'
      },
      error: {
        main: '#b00020',
      },
      focused: {
        main: '#102027',
      },
      primary: {
        contrastText: '#FFF',
        main: '#071e29',
      },
      secondary: {
        contrastText: '#FFF',
        light: '#e6e4e4',
        main: '#37474f',
      },
      tabSelected: {
        main: '#2b691c59'
      },
      text: {
        primary: '#000',
        secondary: 'gray'
      }
    },
    typography: {
      body1: {
        fontSize: "1rem",
        letterSpacing: "0em",
        lineHeight: "1.6em",
      },
      body1Next: {
        fontSize: "1rem",
        letterSpacing: "0em",
        lineHeight: "1.6em",
      },
      body2: {
        fontSize: "0.878rem",
        letterSpacing: "0.015em",
        lineHeight: "1.6em",
      },
      body2Next: {
        fontSize: "0.878rem",
        letterSpacing: "0.015em",
        lineHeight: "1.6em",
      },
      button: {
        fontSize: "0.878rem",
        letterSpacing: "0.09em",
        lineHeight: "2.25rem",
        textTransform: "uppercase",
      },
      buttonNext: {
        fontSize: "0.878rem",
        letterSpacing: "0.09em",
        lineHeight: "2.25rem",
      },
      caption: {
        color: "white",
        fontSize: "0.772rem",
        letterSpacing: "0.33em",
        lineHeight: "1.6rem",
      },
      captionNext: {
        fontSize: "0.772rem",
        letterSpacing: "0.33em",
        lineHeight: "1.6rem",
      },
      fontSize: 16,
      h1: {
        fontSize: "2.822rem",
        letterSpacing: "-0.015em",
        lineHeight: "1.2em",
      },
      h2: {
        fontSize: "1.575rem",
        letterSpacing: "0em",
        lineHeight: "1.33em",
      },
      h3: {
        fontSize: "1.383rem",
        fontWeight: 300,
        letterSpacing: "0em",
        lineHeight: "1.33em",
      },
      h4: {
        fontSize: "1.215rem",
        letterSpacing: "0.007em",
        lineHeight: "1.45em",
      },
      h5: {
        fontSize: "1.138rem",
        letterSpacing: "0.005em",
        lineHeight: "1.55em",
      },
      h6: {
        color: "inherit",
        fontSize: "1.067rem",
        fontWeight: 400,
        letterSpacing: "0.01em",
        lineHeight: "1.6em",
      },
      overline: {
        fontSize: "0.678rem",
        fontWeight: 500,
        letterSpacing: "0.166em",
        lineHeight: "2em",
        textTransform: "uppercase",
      },
      subtitle1: {
        fontSize: "0.937rem",
        fontWeight: 300,
        letterSpacing: "0.015em",
        lineHeight: "1.6em",
      },
      subtitle2: {
        fontSize: "0.878rem",
        fontWeight: 500,
        letterSpacing: "0.02em",
        lineHeight: "1.75em",
      },
      useNextVariants: true
    },
  },
  thumbnailNavigation: {
    defaultPosition: 'off',
    height: 100,
    width: 100,
  },
  translations: {
  },
  window: {
    allowClose: true, // Configure if windows can be closed or not
    allowMaximize: true,
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

export const localConfig: any = deepmerge(rootConfig, discovery)
