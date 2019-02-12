import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Provides a form for user input of a manifest url
 * @prop {Function} fetchManifest
 * @prop {Function} setLastRequested
 */
class ManifestForm extends Component {
  /**
   * constructor -
   */
  constructor(props) {
    super(props);
    this.state = {
      formValue: '',
    };

    this.formSubmit = this.formSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * formSubmit - triggers manifest update and sets lastRequested
   * @param  {Event} event
   * @private
   */
  formSubmit(event) {
    const { fetchManifest, setLastRequested } = this.props;
    const { formValue } = this.state;
    event.preventDefault();
    fetchManifest(formValue);
    setLastRequested(formValue);
  }

  /**
   * handleInputChange - sets state based on input change.
   * @param  {Event} event
   * @private
   */
  handleInputChange(event) {
    const that = this;
    event.preventDefault();
    that.setState({
      formValue: event.target.value,
    });
  }

  /**
   * render
   * @return {String} - HTML markup for the component
   */
  render() {
    const { formValue } = this.state;
    const { t } = this.props;
    return (
      <form onSubmit={this.formSubmit}>
        <input
          value={formValue}
          id="manifestURL"
          type="text"
          onChange={this.handleInputChange}
        />
        <button id="fetchBtn" type="submit">{t('fetchManifest')}</button>
      </form>
    );
  }
}

ManifestForm.propTypes = {
  fetchManifest: PropTypes.func.isRequired,
  setLastRequested: PropTypes.func.isRequired,
  t: PropTypes.func,
};

ManifestForm.defaultProps = {
  t: key => key,
};

export default ManifestForm;
