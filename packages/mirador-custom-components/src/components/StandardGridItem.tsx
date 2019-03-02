import * as React from "react"
import {handleMissingImage, ReduxContext, shortenTitle} from "../utils"

export const StandardGridItem = (props) => {
  const {bemBlocks, result} = props
  const source = result._source
  const index = result._index
  const manifestId = source.manifest
  const workspaceUri = '/view?manifest=' + manifestId
  let thumbnail
  // hack for v1 APIs
  if (index === 'yba2') {
    thumbnail = source.thumbnail + '/full/170,/0/native.jpg'
  } else {
    thumbnail = source.thumbnail + '/full/170,/0/default.jpg'
  }

  const matchManifest = (manifests) => {
    const matched = manifests[manifestId]
    return !!(matched && matched.id);
  }

  const buildItem = (xProps) => {
    return (
      <>
        <div className={bemBlocks.item('poster')}>
          <button
            onClick={
              () => setManifest(xProps, manifestId) // tslint:disable-line
            }
          >{buildImage(thumbnail)}
          </button>
        </div>
        <a href={workspaceUri}>
          <div
            className={bemBlocks.item('title')}
            title={source.title}
            data-qa='title'
            dangerouslySetInnerHTML={{__html: shortenTitle(source.title)}}
          />
        </a>
      </>
    )
  }

  return (
    <ReduxContext.Consumer>{(xProps) =>
      <>
        {matchManifest(xProps.manifests) ?
            (<div
              style={{backgroundColor: 'red'}}
              className={bemBlocks.item().mix(bemBlocks.container("item"))}
              data-qa="hit"
            >
              {buildItem(xProps)}
            </div>) :
            (<div
              className={bemBlocks.item().mix(bemBlocks.container("item"))}
              data-qa="hit"
            >
              {buildItem(xProps)}
            </div>)
        }
      </>
    }
    </ReduxContext.Consumer>)
}

const buildImage = (imageSource) => {
  return (
    <img
      // crossOrigin=''
      width='170'
      onError={(e) => { // tslint:disable-line
        handleMissingImage(e.target as HTMLImageElement)
      }}
      alt='thumbnail'
      src={imageSource}
    />
  )
}

const setManifest = (actions, manifestId) => {
  actions.fetchManifest(manifestId)
  actions.addWindow({manifestId, thumbnailNavigationPosition: "off"})
}
