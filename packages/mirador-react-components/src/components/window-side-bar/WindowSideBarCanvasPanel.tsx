import React, {ReactElement, useState} from 'react';
import { CanvasThumbnail } from './CanvasThumbnail';
import CompanionWindow from '../../containers/window-side-bar/CompanionWindow';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ManifestoCanvas from '../../utils/ManifestoCanvas';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import {makeStyles} from "@material-ui/styles"
import {useTranslation} from "react-i18next"

interface IWindowSideBarCanvasPanel {
  canvases: any
  classes: any
  config: any
  id: string
  setCanvas: any
  t: any
  windowId: string
}

const useStyles = makeStyles(theme => ({
  label: {
    paddingLeft: theme.spacing(1),
  },
  listItem: {
    borderBottom: '0.5px solid rgba(0,0,0,0.12)',
    paddingRight: theme.spacing(1),
  },
  primary: {
    fontFamily: 'Google Sans,Roboto,Arial,sans-serif',
    fontSize: '.875rem',
    fontWeight: 500,
    letterSpacing: '.01785714em',
    lineHeight: '1.25rem',
  },
  select: {
    '&:focus': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  selectEmpty: {
    backgroundColor: theme.palette.background.paper,
  },
}));

/**
 * a panel showing the canvases for a given manifest
 */
export const WindowSideBarCanvasPanel: React.FC<IWindowSideBarCanvasPanel> = (props): ReactElement => {
  const [variant, setVariant] = useState()
  const classes = useStyles()
  const {t} = useTranslation()
  const { canvases, config, id, setCanvas, windowId } = props;

  const handleChange = (event) => {
    setVariant({variant: event.target.checked});
  }

  const getIdAndLabelOfCanvases = () => {
    return canvases.map((canvas) => ({
      id: canvas.id,
      label: new ManifestoCanvas(canvas).getLabel(),
    }));
  }

  const renderCompact = (canvas) => {
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

  const renderThumbnail = (canvas, otherCanvas) => {
    const { width, height } = config.canvasNavigation;
    const manifestoCanvas = new ManifestoCanvas(otherCanvas);

    return (
      <>
        <div style={{ minWidth: 50 }}>
          <CanvasThumbnail
            aspectRatio={manifestoCanvas.aspectRatio}
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

  const canvasesIdAndLabel = getIdAndLabelOfCanvases();
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
                onChange={handleChange}
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
            const onClick = () => { setCanvas({canvasIndex, windowId}); }; // eslint-disable-line require-jsdoc, max-len

            return (
              <ListItem
                alignItems="flex-start"
                button
                className={classes.listItem}
                component="li"
                key={canvas.id}
                onClick={onClick}
              >
                {variant && renderCompact(canvas)}
                {!variant && renderThumbnail(canvas, canvases[canvasIndex])}
              </ListItem>
            );
          })
        }
      </List>
    </CompanionWindow>
  );
}
