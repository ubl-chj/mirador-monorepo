import * as React from 'react'
import {handleMissingImage, ReduxContext, shortenTitle} from '../utils'

export const StandardListItem = (props) => {
  const {bemBlocks, result} = props
  const source: any = Object.assign({}, result._source, result.highlight)
  const index = result._index
  let thumbnail
  if (index === 'yba2') {
    thumbnail = source.thumbnail + '/full/170,/0/native.jpg'
  } else {
    thumbnail = source.thumbnail + '/full/170,/0/default.jpg'
  }
  const manifestId = source.manifest
  return (
    <ReduxContext.Consumer>{(actions) =>
      <div className={bemBlocks.item().mix(bemBlocks.container('item'))} data-qa='hit'>
        <div className={bemBlocks.item('poster')}>
          {buildImage(thumbnail)}
        </div>
        <div className={bemBlocks.item('details')}>
          <button
            onClick={
              () => setManifest(actions, manifestId) // tslint:disable-line
            }
          >
            <div
              className={bemBlocks.item('title')}
              title={source.title}
              data-qa='title'
              dangerouslySetInnerHTML={{__html: shortenTitle(source.title)}}
            />
          </button>
        </div>
      </div>
    }
    </ReduxContext.Consumer>)
}

const buildImage = (imageSource) => {
  return (
    <img
      // crossOrigin=''
      width='90'
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
