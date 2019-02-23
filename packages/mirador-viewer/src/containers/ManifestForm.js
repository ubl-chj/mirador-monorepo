import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
import * as actions from '@mirador/core';
import ManifestForm from '../components/ManifestForm';

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = { fetchManifest: actions.fetchManifest };

const enhance = compose(
  connect(null, mapDispatchToProps),
  withNamespaces(),
  // further HOC go here
);

export default enhance(ManifestForm);
