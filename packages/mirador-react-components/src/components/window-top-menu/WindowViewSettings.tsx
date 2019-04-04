import {BookViewIcon, GalleryViewIcon} from '../icons';
import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuItem from '@material-ui/core/MenuItem';
import ReactDOM from 'react-dom';
import SingleIcon from '@material-ui/icons/CropOriginalSharp';

interface IWindowViewSettings {
  classes: any
  handleClose: any
  setWindowViewType: any
  t: any
  windowId: string
  windowViewType: string
}
/**
 *
 */
export class WindowViewSettings extends Component<IWindowViewSettings> {
  private selectedRef: any

  public constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  /**
   * Take action when the component mounts for the first time
   */
  public componentDidMount() {
    if (this.selectedRef) {
      // MUI uses ReactDOM.findDOMNode and refs for handling focus
      ReactDOM.findDOMNode(this.selectedRef).focus(); // eslint-disable-line react/no-find-dom-node
    }
  }

  private handleSelectedRef(ref) {
    if (this.selectedRef) return;

    this.selectedRef = ref;
  }

  private handleChange(value) {
    const { windowId, setWindowViewType } = this.props;

    setWindowViewType(windowId, value);
  }

  public render() {
    const {
      classes, handleClose, t, windowViewType,
    } = this.props;

    return (
      <>
        <ListSubheader role="presentation" tabIndex={-1}>{t('view')}</ListSubheader>

        <MenuItem
          className={classes.MenuItem}
          onClick={() => { this.handleChange('single'); handleClose(); }}
          ref={ref => this.handleSelectedRef(ref)}
        >
          <FormControlLabel
            classes={{ label: windowViewType === 'single' ? classes.selectedLabel : classes.optionLabel }}
            control={<SingleIcon color={windowViewType === 'single' ? 'primary' : 'inherit'} />}
            label={t('single')}
            labelPlacement="bottom"
            value="single"
          />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('book'); handleClose(); }}>
          <FormControlLabel
            classes={{ label: windowViewType === 'book' ? classes.selectedLabel : classes.optionLabel }}
            control={<BookViewIcon color={windowViewType === 'book' ? 'primary' : 'inherit'} />}
            label={t('book')}
            labelPlacement="bottom"
            value="book"
          />
        </MenuItem>
        <MenuItem className={classes.MenuItem} onClick={() => { this.handleChange('gallery'); handleClose(); }}>
          <FormControlLabel
            classes={{ label: windowViewType === 'gallery' ? classes.selectedLabel : classes.optionLabel }}
            control={<GalleryViewIcon color={windowViewType === 'gallery' ? 'primary' : 'inherit'} />}
            label={t('gallery')}
            labelPlacement="bottom"
            value="gallery"
          />
        </MenuItem>
      </>
    );
  }
}
