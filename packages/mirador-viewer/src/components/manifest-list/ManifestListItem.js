import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ReactPlaceholder from 'react-placeholder';
import { RectShape, TextBlock, TextRow } from 'react-placeholder/lib/placeholders';
import Img from 'react-image';
import ManifestListItemError from '../../containers/manifes-list/ManifestListItemError';
import ns from '../../config/css-ns';
import 'react-placeholder/lib/reactPlaceholder.css';

/**
 * Handling open button click
 */
const handleOpenButtonClick = (event, manifest, addWindow) => {
  addWindow({ manifestId: manifest });
};
/**
 * Represents an item in a list of currently-loaded or loading manifests
 * @param {object} props
 * @param {object} [props.manifest = string]
 */

/** */
export class ManifestListItem extends React.Component {
  /** */
  componentDidMount() {
    const {
      fetchManifest, manifestId, ready, isFetching, error,
    } = this.props;

    if (!ready && !error && !isFetching) fetchManifest(manifestId);
  }

  /** */
  render() {
    const {
      manifestId,
      ready,
      title,
      thumbnail,
      manifestLogo,
      addWindow,
      handleClose,
      size,
      classes,
      provider,
      t,
      error,
    } = this.props;

    const placeholder = (
      <Grid className={ns('manifest-list-item')} container spacing={24}>
        <Grid item sm={2} xs={3}>
          <RectShape color="gray" style={{ height: 80, width: 120 }} />
        </Grid>
        <Grid item sm={6} xs={9}>
          <TextRow color="gray" />
        </Grid>
        <Grid item sm={2} xs={8}>
          <TextBlock color="gray" rows={2} />
        </Grid>
        <Grid item sm={2} xs={4}>
          <RectShape color="gray" style={{ height: 60, width: 60 }} />
        </Grid>
      </Grid>
    );

    if (error) {
      return (
        <ListItem className={classes.root} data-manifestid={manifestId} divider elevation={1}>
          <ManifestListItemError manifestId={manifestId} />
        </ListItem>
      );
    }

    return (
      <ListItem className={classes.root} data-manifestid={manifestId} divider elevation={1}>
        <ReactPlaceholder
          customPlaceholder={placeholder}
          delay={500}
          ready={ready}
          showLoadingAnimation
        >
          <Grid className={ns('manifest-list-item')} container spacing={24}>
            <Grid item sm={6} xs={12}>
              <ButtonBase
                className={ns('manifest-list-item-title')}
                onClick={
                  (event) => { handleOpenButtonClick(event, manifestId, addWindow); handleClose(); }
                }
                style={{ width: '100%' }}
              >
                <Grid className={classes.label} container spacing={24}>
                  <Grid item sm={3} xs={4}>
                    <Img
                      alt=""
                      className={ns('manifest-list-item-thumb')}
                      height="80"
                      src={[thumbnail]}
                      unloader={(
                        <RectShape
                          className={classes.placeholder}
                          style={{ height: 80, width: 120 }}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item sm={9} xs={8}>
                    <Typography component="span" variant="h6">
                      {title || manifestId}
                    </Typography>
                  </Grid>
                </Grid>
              </ButtonBase>
            </Grid>
            <Grid item sm={4} xs={8}>
              <Typography className={ns('manifest-list-item-provider')}>{provider || t('addedFromUrl')}</Typography>
              <Typography>{t('numItems', { number: size })}</Typography>
            </Grid>

            <Grid item sm={2} xs={4}>
              <Img
                alt=""
                className={classes.logo}
                role="presentation"
                src={[manifestLogo]}
                unloader={
                  <RectShape className={classes.placeholder} style={{ height: 60, width: 60 }} />
                }
              />
            </Grid>
          </Grid>
        </ReactPlaceholder>
      </ListItem>
    );
  }
}

ManifestListItem.propTypes = {
  addWindow: PropTypes.func.isRequired,
  classes: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  error: PropTypes.string,
  fetchManifest: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
  isFetching: PropTypes.bool,
  manifestId: PropTypes.string.isRequired,
  manifestLogo: PropTypes.string,
  provider: PropTypes.string,
  ready: PropTypes.bool,
  size: PropTypes.number,
  t: PropTypes.func,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};

ManifestListItem.defaultProps = {
  classes: {},
  error: null,
  handleClose: () => {},
  isFetching: false,
  manifestLogo: null,
  provider: null,
  ready: false,
  size: 0,
  t: key => key,
  thumbnail: null,
  title: null,
};
