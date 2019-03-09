import Button from '@material-ui/core/Button'
import * as React from 'react'
import {Image} from '.'
import {buildThumbnailReference, ReduxContext, setManifest, shortenTitle} from '../utils'

interface IStandardListItem {
  bemBlocks: any,
  result: {
    highlight: any,
    _source: {
      Author: string,
      manifest: string,
      thumbnail: string,
      title: string,
    }
  }
}

export const StandardListItem : React.FC<IStandardListItem> = (props) => {
  const {bemBlocks, result} = props
  const source = Object.assign({}, result._source, result.highlight)
  const thumbnail = buildThumbnailReference(source.thumbnail)
  const manifestId = source.manifest
  return (
    <ReduxContext.Consumer>{(actions) =>
      <div
        className={bemBlocks.item().mix(bemBlocks.container('item'))}
        data-qa='hit'
      >
        <div className={bemBlocks.item('poster')}>
          <Image
            imageSource={thumbnail}
            width={90}
          />
        </div>
        <div className={bemBlocks.item('details')}>
          <Button
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
          </Button>
          <div
            className={bemBlocks.item('author')}
            dangerouslySetInnerHTML={{__html: source.Author}}
          />
        </div>
      </div>
    }
    </ReduxContext.Consumer>)
}
