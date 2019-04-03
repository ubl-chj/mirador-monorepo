import { MosaicRenderPreview } from '../components/MosaicRenderPreview';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getManifestTitle } from '@mirador/core';
import { withPlugins } from '../extend';
import { withStyles } from '@material-ui/core/styles';
import { withTranslation } from 'react-i18next';

/** */
const mapStateToProps = (state, { windowId }) => (
  {
    title: getManifestTitle(state, { windowId }),
  }
);

/**
 *
 * @param theme
 * @returns {{ctrlBtn: {margin: (number|string)}}}
 */
const styles = theme => ({
  preview: {
    ...theme.typography.h4,
  },
});

const enhance: any = compose(
  withStyles(styles),
  withTranslation(),
  connect(mapStateToProps, null),
);

export default enhance(MosaicRenderPreview);
