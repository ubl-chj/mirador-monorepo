import {IManifest, IManifesto} from "mirador-core-model"
import {IManifestResource} from 'manifesto'
import ManifestoCanvas from '../utils/ManifestoCanvas';
import {createSelector} from 'reselect'

const manifesto = require('manifesto.js'); //eslint-disable-line

/** Get the relevant manifest information */
export const getManifest = (state, { windowId, manifestId, canvasIndex, motivations }: {
  windowId: string, manifestId?: string, canvasIndex?: string, motivations?: any}) => {
  return state.manifests[manifestId || canvasIndex || motivations || (windowId && state.windows && state.windows[windowId] && state.windows[windowId].manifestId)];
}

/** Instantiate a manifesto instance */
export const getManifestoInstance = createSelector(
  getManifest,
  (manifest: IManifest) => manifest && manifest.json && manifesto.create(manifest.json),
);

/**
 *
 */
export const getManifestCanvases = createSelector(
  getManifestoInstance,
  (manifest: IManifesto) => {
    if (!manifest) {
      return [];
    }
    if (!manifest.getSequences || !manifest.getSequences()[0]) {
      return [];
    }
    return manifest.getSequences()[0].getCanvases();
  },
);

/**
 *
 */
export const getManifestLogo = createSelector(
  getManifestoInstance,
  (manifest: IManifesto) => manifest && manifest.getLogo(),
);

/**
 *
 */
export const getManifestProvider = createSelector(
  getManifestoInstance,
  (manifest: IManifesto) => manifest
    && manifest.getProperty('provider')
    && manifest.getProperty('provider')[0].label
    && manifesto.LanguageMap.parse(manifest.getProperty('provider')[0].label, manifest.options.locale).map(label => label.value)[0],
);

/**
 * Return the supplied thumbnail for a manifest or null
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {String|null}
 */
export const getManifestThumbnail = (state, props) => {
  /** */
  function getTopLevelManifestThumbnail(): string {
    const manifest = getManifestoInstance(state, props);

    return manifest
      && manifest.getThumbnail()
      && manifest.getThumbnail().id;
  }

  /** */
  function getFirstCanvasThumbnail() {
    const canvases = getManifestCanvases(state, props);

    return canvases.length > 0 && canvases[0].getThumbnail() && canvases[0].getThumbnail().id;
  }

  /** */
  function generateThumbnailFromFirstCanvas() {
    const canvases = getManifestCanvases(state, props);

    if (canvases.length === 0) return null;

    const manifestoCanvas = new ManifestoCanvas(canvases[0]);

    return manifestoCanvas.thumbnail(null, 80);
  }

  return getTopLevelManifestThumbnail()
    || getFirstCanvasThumbnail()
    || generateThumbnailFromFirstCanvas();
}

/**
 * Return manifest title
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {String}
 */
export const getManifestTitle = createSelector(
  getManifestoInstance,
  (manifest: IManifesto) => manifest
    && manifest.getLabel().map(label => label.value)[0],
);

/**
 * Return manifest description
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {String}
 */
export const getManifestDescription = createSelector(
  getManifestoInstance,
  (manifest: IManifesto) => manifest
    && manifest.getDescription().map(label => label.value)[0],
);

/**
 *
 * @param iiifResource
 */
export const getDestructuredMetadata = (iiifResource: IManifestResource) => {
  return (iiifResource
    && iiifResource.getMetadata().map(labelValuePair => ({
      label: labelValuePair.getLabel(),
      value: labelValuePair.getValue(),
    }))
  );
}

/**
 * Return manifest metadata in a label / value structure
 * @param {object} state
 * @param {object} props
 * @param {string} props.manifestId
 * @param {string} props.windowId
 * @return {Array[Object]}
 */
export const getManifestMetadata = createSelector(
  getManifestoInstance,
  (manifest: IManifestResource) => manifest && getDestructuredMetadata(manifest),
);
