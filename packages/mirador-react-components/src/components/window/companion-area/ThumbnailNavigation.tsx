import React, {Component} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import CanvasWorld from '../../../utils/CanvasWorld';
import {VariableSizeList as List} from 'react-window';
import ThumbnailCanvasGrouping from '../../../containers/window/companion-area/ThumbnailCanvasGrouping';
import classNames from 'classnames';
import ns from '../../../config/css-ns';

interface IThumbnailNavigation {
  canvasGroupings: any
  classes: any
  config: any
  position: string
  setCanvas: Function
  t: Function
  window: any
}

export class ThumbnailNavigation extends Component<IThumbnailNavigation> {
  private scrollbarSize: number
  private spacing: number
  private gridRef: any

  public constructor(props) {
    super(props);

    this.scrollbarSize = 15;
    this.spacing = 8; // 2 * (2px margin + 2px border + 2px padding + 2px padding)
    this.calculateScaledSize = this.calculateScaledSize.bind(this);
    this.itemCount = this.itemCount.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.nextCanvas = this.nextCanvas.bind(this);
    this.previousCanvas = this.previousCanvas.bind(this);
    this.gridRef = React.createRef();
  }

  /**
   * If the view has changed and the thumbnailNavigation is open, recompute all
   * of the grids
   */
  public componentDidUpdate(prevProps) {
    const { position, window } = this.props;
    if (prevProps.window.view !== window.view && position !== 'off') {
      this.gridRef.current.resetAfterIndex(0);
    }
    if (prevProps.window.canvasIndex !== window.canvasIndex) {
      let index = window.canvasIndex;
      if (window.view === 'book') index = Math.ceil(index / 2);
      this.gridRef.current.scrollToItem(index, 'center');
    }
  }

  /**
   * When on right, row height
   * When on bottom, column width
   */
  private calculateScaledSize(index) {
    const { config, canvasGroupings, position } = this.props;
    const canvases = canvasGroupings.groupings()[index];
    const world = new CanvasWorld(canvases);
    const bounds = world.worldBounds();
    switch (position) {
      case 'far-right': {
        const calc = Math.floor(
          this.calculatingWidth(canvases.length) * bounds[3] / bounds[2],
        );
        return calc + this.spacing;
      }
      // Default case bottom
      default: {
        return Math.ceil(
          (config.thumbnailNavigation.height - this.scrollbarSize - this.spacing - 4)
          * bounds[2] / bounds[3],
        );
      }
    }
  }

  /** */
  private calculatingWidth(canvasesLength) {
    const { config } = this.props;
    if (canvasesLength === 1) {
      return config.thumbnailNavigation.width;
    }
    return config.thumbnailNavigation.width * 2;
  }

  /** */
  private rightWidth() {
    const { window, config } = this.props;
    if (window.view === 'book') {
      return (config.thumbnailNavigation.width * 2);
    } else {
      return config.thumbnailNavigation.width;
    }
  }

  public style() {
    const { position, config } = this.props;
    if (position === 'far-right') {
      return {
        height: '100%',
        minHeight: 0,
        width: `${this.rightWidth() + this.scrollbarSize + this.spacing}px`,
      };
    } else {
      return {
        height: `${config.thumbnailNavigation.height}px`,
        width: '100%',
      };
    }
  }

  private areaHeight(height) {
    const { config, position } = this.props;
    if (position === 'far-right') {
      return height;
    } else {
      return config.thumbnailNavigation.height;
    }
  }

  private itemCount() {
    const { canvasGroupings } = this.props;
    return canvasGroupings.groupings().length;
  }

  private handleKeyUp(e) {
    const { position } = this.props;
    let nextKey = 'ArrowRight';
    let previousKey = 'ArrowLeft';
    if (position === 'far-right') {
      nextKey = 'ArrowDown';
      previousKey = 'ArrowUp';
    }
    switch (e.key) {
      case nextKey:
        this.nextCanvas();
        break;
      case previousKey:
        this.previousCanvas();
        break;
      default:
        break;
    }
  }

  private nextCanvas() {
    const { window, setCanvas } = this.props;
    if (this.hasNextCanvas()) {
      setCanvas({canvasIndex: window.canvasIndex + this.canvasIncrementor(), windowId: window.id});
    }
  }

  private hasNextCanvas() {
    const { window, canvasGroupings } = this.props;
    return window.canvasIndex < canvasGroupings.canvases.length - this.canvasIncrementor();
  }

  private previousCanvas() {
    const { window, setCanvas } = this.props;
    if (this.hasPreviousCanvas()) {
      setCanvas({canvasIndex: Math.max(0, window.canvasIndex - this.canvasIncrementor()), windowId: window.id});
    }
  }

  private hasPreviousCanvas() {
    const { window } = this.props;
    return window.canvasIndex > 0;
  }

  private canvasIncrementor() {
    const { window } = this.props;
    if (window.view === 'book') {
      return 2;
    } else {
      return 1;
    }
  }

  public render() {
    const {
      t,
      canvasGroupings,
      classes,
      config,
      position,
      window,
    } = this.props;
    if (position === 'off') {
      return <></>;
    }
    return (
      <div
        aria-label={t('thumbnailNavigation')}
        className={classNames(
          ns('thumb-navigation'),
          classes.thumbNavigation,
        )}
        onKeyUp={this.handleKeyUp}
        role="grid"
        style={this.style()}
        tabIndex={0}
      >
        <AutoSizer
          defaultHeight={100}
          defaultWidth={400}
        >
          {({ height, width }) => (
            <List
              height={this.areaHeight(height)}
              itemCount={this.itemCount()}
              itemData={{
                canvasGroupings,
                config,
                height: config.thumbnailNavigation.height - this.spacing - this.scrollbarSize,
                position,
                windowId: window.id,
              }}
              itemSize={this.calculateScaledSize}
              layout={(position === 'far-bottom') ? 'horizontal' : 'vertical'}
              ref={this.gridRef}
              width={width}
            >
              {ThumbnailCanvasGrouping}
            </List>
          )}
        </AutoSizer>
      </div>
    );
  }
}

