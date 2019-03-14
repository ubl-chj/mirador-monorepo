import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import { CanvasThumbnail } from './CanvasThumbnail';
import ManifestoCanvas from '../lib/ManifestoCanvas';
import CompanionWindow from '../containers/CompanionWindow';
import { getIdAndLabelOfCanvases } from '../state/selectors';

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component {
  /** */
  constructor(props) {
    super(props);

    this.state = { variant: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ variant: event.target.checked });
  }

  /** */
  renderCompact(canvas, otherCanvas) {
    const {
      classes,
    } = this.props;

    return (
      <>
        <Typography
          className={classNames(classes.label)}
          variant="body2"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }

  /** */
  renderThumbnail(canvas, otherCanvas) {
    const {
      classes, config,
    } = this.props;
    const { width, height } = config.canvasNavigation;
    const manifestoCanvas = new ManifestoCanvas(otherCanvas);

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <CanvasThumbnail
            className={classNames(classes.clickable)}
            isValid={manifestoCanvas.hasValidDimensions}
            imageUrl={manifestoCanvas.thumbnail(width, height)}
            maxHeight={config.canvasNavigation.height}
            maxWidth={config.canvasNavigation.width}
            aspectRatio={manifestoCanvas.aspectRatio}
          />
        </div>
        <Typography
          className={classNames(classes.label)}
          variant="body2"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }

  /**
   * render
   */
  render() {
    const {
      canvases, classes, setCanvas, t, windowId, id,
    } = this.props;

    const { variant } = this.state;


    const canvasesIdAndLabel = getIdAndLabelOfCanvases(canvases);
    return (
      <CompanionWindow
        title={t('canvasIndex')}
        id={id}
        windowId={windowId}
        titleControls={(
          <FormControl>
            <FormControlLabel
              control={
                <Switch
                  checked={variant}
                  onChange={this.handleChange}
                  value="variant"
                />
              }
              label="Compact"
            />
          </FormControl>
          )}
      >
        <List>
          {
            canvasesIdAndLabel.map((canvas, canvasIndex) => {
              const onClick = () => { setCanvas(windowId, canvasIndex); }; // eslint-disable-line require-jsdoc, max-len

              return (
                <ListItem
                  key={canvas.id}
                  alignItems="flex-start"
                  onClick={onClick}
                  button
                  component="li"
                >
                  {variant && this.renderCompact(canvas, canvases[canvasIndex])}
                  {!variant && this.renderThumbnail(canvas, canvases[canvasIndex])}
                </ListItem>
              );
            })
          }
        </List>
      </CompanionWindow>
    );
  }
}

WindowSideBarCanvasPanel.propTypes = {
  canvases: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  config: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  setCanvas: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  windowId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
