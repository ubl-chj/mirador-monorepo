import React, { Component } from 'react';
import { CanvasThumbnail } from './CanvasThumbnail';
import CompanionWindow from '../containers/CompanionWindow';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ManifestoCanvas from '../utils/ManifestoCanvas';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';

interface IWindowSideBarCanvasPanel {
  canvases: any
  classes: any
  config: any
  id: string
  setCanvas: any
  t: any
  windowId: string
}

/**
 * a panel showing the canvases for a given manifest
 */
export class WindowSideBarCanvasPanel extends Component<IWindowSideBarCanvasPanel> {
  public state: {
    variant: any
  }
  /** */
  public constructor(props) {
    super(props);

    this.state = { variant: false };
    this.handleChange = this.handleChange.bind(this);
  }

  private handleChange(event) {
    this.setState({variant: event.target.checked});
  }

  /** @private */
  private getIdAndLabelOfCanvases() {
    const { canvases } = this.props;

    return canvases.map((canvas) => ({
      id: canvas.id,
      label: new ManifestoCanvas(canvas).getLabel(),
    }));
  }

  /** */
  private handleVariantChange(event) {
    this.setState({ variant: event.target.value });
  }

  /** */
  private renderCompact(canvas) {
    const {classes} = this.props;

    return (
      <>
        <Typography
          className={classNames(classes.label)}
          variant="body1"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }

  /** */
  private renderThumbnail(canvas, otherCanvas) {
    const {
      classes, config,
    } = this.props;
    const { width, height } = config.canvasNavigation;
    const manifestoCanvas = new ManifestoCanvas(otherCanvas);

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <CanvasThumbnail
            aspectRatio={manifestoCanvas.aspectRatio}
            className={classNames(classes.clickable)}
            imageUrl={manifestoCanvas.thumbnail(width, height)}
            isValid={manifestoCanvas.hasValidDimensions}
            maxHeight={config.canvasNavigation.height}
            maxWidth={config.canvasNavigation.width}
          />
        </div>
        <Typography
          className={classNames(classes.label)}
          variant="body1"
        >
          {canvas.label}
        </Typography>
      </>
    );
  }

  /**
   * render
   */
  public render() {
    const {canvases, setCanvas, classes, t, windowId, id} = this.props;

    const { variant } = this.state;


    const canvasesIdAndLabel = this.getIdAndLabelOfCanvases();
    return (
      <CompanionWindow
        id={id}
        title={t('canvasIndex')}
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
        windowId={windowId}
      >
        <List>
          {
            canvasesIdAndLabel.map((canvas, canvasIndex) => {
              const onClick = () => { setCanvas(windowId, canvasIndex); }; // eslint-disable-line require-jsdoc, max-len

              return (
                <ListItem
                  alignItems="flex-start"
                  button
                  className={classes.listItem}
                  component="li"
                  key={canvas.id}
                  onClick={onClick}
                >
                  {variant && this.renderCompact(canvas)}
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
