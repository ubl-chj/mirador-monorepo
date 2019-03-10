import React, {ReactElement} from 'react'
import {ReduxContext, buildThumbnailReference, setManifest, shortenTitle} from '../utils'
import Button from '@material-ui/core/Button'
import {Image} from '.'

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

export const StandardGridItem: React.FC<IStandardGridItem> = (props): ReactElement => {
  const {bemBlocks, result} = props
  const source = result._source
  const manifestId = source.manifest
  const workspaceUri = '/view?manifest=' + manifestId
  const thumbnail = buildThumbnailReference(source.thumbnail)

  const matchManifest = (manifests): boolean => {
    const matched = manifests[manifestId]
    return !!(matched && matched.id)
  }

  const buildItem = (xProps): JSX.Element => {
    return (
      <>
        <div className={bemBlocks.item('poster')}>
          <Button
            onClick={() => setManifest(xProps, manifestId)}
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
            dangerouslySetInnerHTML={{__html: shortenTitle(source.title)}}
            data-qa='title'
            title={source.title}
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
            className={bemBlocks.item().mix(bemBlocks.container('item'))}
            data-qa="hit"
            style={{backgroundColor: '#baccbc'}}
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
