import React, {ReactElement} from 'react'
import {ReduxContext, buildThumbnailReference, setManifest, shortenTitle} from '../utils'
import Button from '@material-ui/core/Button'
import {Image} from '.'
import { Query } from "react-apollo";
import gql from "graphql-tag";

interface IStandardGridItem {
  bemBlocks: any
  result: {
    _index: string
    _source: {
      Author: string
      manifest: string
      Manifest: string
      thumbnail: string
      title: string
    }
  }
}

const defaultLang = 'en'
const GET_MANIFEST_LABEL = gql`
          query Label($manifestId: String!) {
              manifest(id: $manifestId)
          {label {${defaultLang}}}
          }`

export const StandardGridItem: React.FC<IStandardGridItem> = (props): ReactElement => {
  const {bemBlocks, result} = props
  const source = result._source
  const index = result._index
  const manifestId = source.manifest ? source.manifest : source.Manifest
  const workspaceUri = '/view?manifest=' + manifestId
  const thumbnail = buildThumbnailReference(source.thumbnail)

  const matchManifest = (manifests): boolean => {
    const matched = manifests[manifestId]
    return !!(matched && matched.id)
  }

  const buildSummary = (): JSX.Element => {
    return (<Query
      query={GET_MANIFEST_LABEL}
      variables={{manifestId}}
    >
      {({loading, error, data}) => {
        if (loading) {
          return <p>Loading...</p>
        }
        if (error) {
          return <p>Error: {error.graphQLErrors.map(({message}, i) => (<span key={i}>{message}</span>))}
          </p>
        }
        return (
          <div
            className={bemBlocks.item('title')}
            data-qa='title'
            title={data.manifest.summary}
          >{data.manifest ? data.manifest.label[defaultLang][0] : null}
          </div>
        )
      }}
    </Query>)
  }

  const buildItem = (xProps): JSX.Element => {
    if (manifestId) {
      return (
            <>
            <div className={bemBlocks.item('poster')}>
              <Button
                href=''
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
              {index === 'ox1' ? buildSummary() : null}
            </a>
            <div className={bemBlocks.item('author')} dangerouslySetInnerHTML={{__html: source.Author}}/>
            </>
      )
    }
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
