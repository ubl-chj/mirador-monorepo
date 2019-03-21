import { compose } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles } from '@material-ui/core/styles';
import { WindowSideBarCanvasPanel } from '../components/WindowSideBarCanvasPanel';
import {
  getManifestCanvases,
  setCanvas
} from '@mirador/core';
import { withPlugins } from '../extend';

/**
 * mapStateToProps - to hook up connect
 */
const mapStateToProps = (state, { windowId }) => {
  const canvases = getManifestCanvases(state, { windowId });
  const { config } = state;
  return {
    canvases,
    config,
  };
};

const mapDispatchToProps = { setCanvas };

/**
 *
 * @param theme
 * @returns {label: {paddingLeft: number}}}
 */
const styles = theme => ({
  label: {
    paddingLeft: theme.spacing.unit,
  },
  primary: {
    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
    fontSize: '.875rem',
    fontWeight: 500,
    letterSpacing: '.01785714em',
    lineHeight: '1.25rem',
  },
  listItem: {
    borderBottom: '0.5px solid rgba(0,0,0,0.12)',
    paddingRight: theme.spacing.unit,
  },
  select: {
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  selectEmpty: {
    backgroundColor: theme.palette.background.paper,
  },
});

const enhance = compose(
  withTranslation(),
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('WindowSideBarCanvasPanel'),
);

export default enhance(WindowSideBarCanvasPanel);
