import {Domain} from '../enum'
import uuidv5 from 'uuidv5'

export const handleMissingImage = (target): string => {
  return target.src = Domain.THUMBNAIL_NOTFOUND_SVG // eslint-disable-line
}

export const resolveManifestId = (source): string => {
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

export const shortenTitle = (name): string => {
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

export const buildThumbnailReference = (thumbnail): string => {
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

export const setManifest = (actions, manifestId): any => {
  actions.fetchManifest(manifestId)
  actions.evaluateWindows({manifestId, thumbnailNavigationPosition: 'off'})
}
