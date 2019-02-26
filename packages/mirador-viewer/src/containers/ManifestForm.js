import { connect } from 'react-redux';
import { compose } from 'redux';
import { withNamespaces } from 'react-i18next';
<<<<<<< HEAD
import * as actions from '@mirador/core';
import ManifestForm from '../components/ManifestForm';
=======
import * as actions from '../state/actions';
import { ManifestForm } from '../components/ManifestForm';
>>>>>>> ef1377591466b03f07d47dfba228f435c1fe4ae7

/**
 * mapDispatchToProps - used to hook up connect to action creators
 * @memberof ManifestForm
 * @private
 */
const mapDispatchToProps = { fetchManifest: actions.fetchManifest };

const enhance = compose(
  withNamespaces(),
  connect(null, mapDispatchToProps),
);

export default enhance(ManifestForm);
