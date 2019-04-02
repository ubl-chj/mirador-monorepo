import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLanguagesFromConfigWithCurrent, updateConfig } from '@mirador/core';
import { LanguageSettings } from '../../components/control-panel/LanguageSettings';
import { withPlugins } from '../../extend';

/**
 * Map state to props for connect
 */
const mapStateToProps = state => ({
  languages: getLanguagesFromConfigWithCurrent(state),
});

/**
 * Map action dispatches to props for connect
 */
const mapDispatchToProps = (dispatch, { afterSelect }) => ({
  handleClick: (language) => {
    dispatch(updateConfig({ language }));

    afterSelect && afterSelect();
  },
});


export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withPlugins('LanguageSettings'),
)(LanguageSettings);
