import Button from '@material-ui/core/Button'
import * as React from 'react'
import {Image} from '.'
import {buildThumbnailReference, ReduxContext, setManifest, shortenTitle} from '../utils'

interface IStandardGridItem {
  bemBlocks: any,
  result: {
    _source: {
      Author: string,
      manifest: string,
      thumbnail: string,
      title: string,
    }
  }
}

export const StandardGridItem : React.FC<IStandardGridItem> = (props) => {
  const {bemBlocks, result} = props
  const source = result._source
  const manifestId = source.manifest
  const workspaceUri = '/view?manifest=' + manifestId
  const thumbnail = buildThumbnailReference(source.thumbnail)
  const matchManifest = (manifests) => {
    const matched = manifests[manifestId]
    return !!(matched && matched.id)
  }

  const buildItem = (xProps) => {
    return (
      <>
        <div className={bemBlocks.item('poster')}>
          <Button
            onClick={
              () => setManifest(xProps, manifestId) // tslint:disable-line
            }
          >
            <Image
              imageSource={thumbnail}
              width={170}
            />
          </Button>
        </div>
        <a href={workspaceUri}>
          <div
            className={bemBlocks.item('title')}
            title={source.title}
            data-qa='title'
            dangerouslySetInnerHTML={{__html: shortenTitle(source.title)}}
          />
        </a>
        <div className={bemBlocks.item('author')} dangerouslySetInnerHTML={{__html: source.Author}}/>
      </>
    )
  }

  return (
    <ReduxContext.Consumer>{(xProps) =>
      <>
        {matchManifest(xProps.manifests)
          ? (<div
            style={{backgroundColor: '#baccbc'}}
            className={bemBlocks.item().mix(bemBlocks.container('item'))}
            data-qa="hit"
          >
            {buildItem(xProps)}
          </div>)
          : (<div
            className={bemBlocks.item().mix(bemBlocks.container('item'))}
            data-qa="hit"
          >
            {buildItem(xProps)}
          </div>)
        }
      </>
    }
    </ReduxContext.Consumer>)
}
