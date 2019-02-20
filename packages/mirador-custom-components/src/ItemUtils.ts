import uuidv5 from 'uuidv5'

export function resolveManifestId(source) {
  if (source.manifest) {
    let manifest;
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
  if (name) {
    if (!Array.isArray(name)) {
      if (name.length >= 80) {
        shortTitle =  name.substr(0, 80) + '... '
      } else {
        return name;
      }
    } else {
      shortTitle =  name[0]
    }
  }
  return shortTitle
}
