import uuidv5 from 'uuidv5'
import {Domain} from '../enum'

export const handleMissingImage = (target) => {
  return target.src = Domain.THUMBNAIL_NOTFOUND_SVG // eslint-disable-line
}

export function resolveManifestId(source) {
  if (source.manifest) {
    let manifest
    const regexp = /http[^s]/i
    if (source.manifest.match(regexp)) {
      manifest = source.manifest.replace('http', 'https')
    } else {
      manifest = source.manifest
    }
    return uuidv5('url', manifest)
  } else if (source.Manifest) {
    return uuidv5('url', source.Manifest)
  }
}

export function shortenTitle(name) {
  let shortTitle
  if (name && !Array.isArray(name)) {
    if (name.length >= 80) {
      shortTitle = name.substr(0, 80) + '... '
    } else {
      return name
    }
  } else {
    shortTitle = name[0]
  }
  return shortTitle
}

export const buildThumbnailReference = (thumbnail) => {
  let thumbnailLink
  if (thumbnail) {
    if (thumbnail.includes('/full')) {
      thumbnailLink = thumbnail
      // support image api v1 providers (this should not be a long list)
    } else if (thumbnail.includes(Domain.LEGACY_API_COLLECTIONS)) {
      thumbnailLink = thumbnail + Domain.THUMBNAIL_NATIVE_API_REQUEST
    } else {
      thumbnailLink = thumbnail + Domain.THUMBNAIL_API_REQUEST
    }
  } else {
    thumbnailLink = thumbnail
  }
  return thumbnailLink
}

export const setManifest = (actions, manifestId) => {
  actions.fetchManifest(manifestId)
  actions.addWindow({manifestId, thumbnailNavigationPosition: 'off'})
}
