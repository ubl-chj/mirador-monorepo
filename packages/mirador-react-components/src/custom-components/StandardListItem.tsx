import React, {ReactElement} from 'react'
import {buildThumbnailReference, shortenTitle} from './utils'
import {evalAddWindows, fetchManifestWorker} from "@mirador/core"
import Button from '@material-ui/core/Button'
import {Image} from '.'
import {useDispatch} from 'react-redux'

interface IStandardListItem {
  bemBlocks: any
  result: {
    highlight: any
    _source: {
      Author: string
      manifest: string
      Manifest: string
      thumbnail: string
      title: string
    }
  }
}

export const StandardListItem: React.FC<IStandardListItem> = (props): ReactElement => {
  const {bemBlocks, result} = props
  const source = Object.assign({}, result._source, result.highlight)
  const thumbnail = buildThumbnailReference(source.thumbnail)
  const manifestId = source.manifest ? source.manifest : source.Manifest
  const dispatch = useDispatch()

  const setManifest = (manifestId): any => {
    dispatch(fetchManifestWorker({manifestId}))
    dispatch(evalAddWindows({manifestId, thumbnailNavigationPosition: 'off'}))
  }

  return (
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
          href=''
          onClick={
            () => setManifest(manifestId) // tslint:disable-line
          }
        >
          <div
            className={bemBlocks.item('title')}
            dangerouslySetInnerHTML={{__html: shortenTitle(source.title)}}
            data-qa='title'
            title={source.title}
          />
        </Button>
        <div
          className={bemBlocks.item('author')}
          dangerouslySetInnerHTML={{__html: source.Author}}
        />
      </div>
    </div>
  )
}
