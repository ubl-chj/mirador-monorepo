import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { SanitizedHtml } from './SanitizedHtml';
import { ManifestURI, MetadataList } from '@mirador/custom-components';
import CompanionWindow from '../containers/CompanionWindow';
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
      t,
    } = this.props;

    return (
      <CompanionWindow title={t('aboutThisItem')} paperClassName={ns('window-sidebar-info-panel')} windowId={windowId} id={id}>
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
          <MetadataList labelValuePairs={canvasMetadata} />
        )}

        <Divider />

        {manifestDescription && (
          <Typography variant="body2">
            <SanitizedHtml htmlString={manifestDescription} ruleSet="iiif" />
          </Typography>
        )}

        {manifestMetadata.length > 0 && (
          <MetadataList labelValuePairs={manifestMetadata} />
        )}
        <ManifestURI manifestId={manifestId}/>
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
};

WindowSideBarInfoPanel.defaultProps = {
  canvasDescription: null,
  canvasLabel: null,
  canvasMetadata: [],
  manifestLabel: null,
  manifestDescription: null,
  manifestMetadata: [],
  t: key => key,
};
