import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import { ManifestURI } from '@mirador/custom-components';
import CompanionWindow from '../containers/CompanionWindow';
import LabelValueMetadata from '../containers/LabelValueMetadata'
import ns from '../config/css-ns';

/**
 * WindowSideBarInfoPanel
 */
export class WindowSideBarInfoPanel extends Component {
  /**
   * render
   * @return
   */
  render() {
    const {
      canvasDescription,
      canvasLabel,
      canvasMetadata,
      manifestDescription,
      manifestId,
      manifestMetadata,
      windowId,
      id,
      classes,
      t,
    } = this.props;

    return (
      <CompanionWindow title={t('aboutThisItem')} paperClassName={ns('window-sidebar-info-panel')} windowId={windowId} id={id}>
        <div className={classes.section}>
          {canvasLabel && (
            <>
              <Typography variant="overline" id={`${id}-currentItem`}>{t('currentItem')}</Typography>
              <Typography aria-labelledby={`${id}-currentItem`} variant="h4">
                {canvasLabel}
              </Typography>
            </>
          )}

          {canvasDescription && (
            <Typography variant="body1">
              <SanitizedHtml htmlString={canvasDescription} ruleSet="iiif" />
            </Typography>
          )}

          {canvasMetadata.length > 0 && (
            <LabelValueMetadata labelValuePairs={canvasMetadata} />
          )}
        </div>

        <div className={classes.section}>
          {manifestDescription && (
            <Typography variant="body1">
              <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
            </Typography>
          )}
          {manifestMetadata.length > 0 && (
            <LabelValueMetadata labelValuePairs={manifestMetadata} />
          )}
          <ManifestURI manifestId={manifestId}/>
        </div>
      </CompanionWindow>
    );
  }
}

WindowSideBarInfoPanel.propTypes = {
  canvasDescription: PropTypes.string,
  canvasLabel: PropTypes.string,
  canvasMetadata: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  manifestLabel: PropTypes.string,
  manifestDescription: PropTypes.string,
  manifestId: PropTypes.string,
  manifestMetadata: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  t: PropTypes.func,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

WindowSideBarInfoPanel.defaultProps = {
  canvasDescription: null,
  canvasLabel: null,
  canvasMetadata: [],
  manifestLabel: null,
  manifestDescription: null,
  manifestMetadata: [],
  t: key => key,
  classes: {},
};
