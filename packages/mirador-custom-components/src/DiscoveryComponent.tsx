import * as React from 'react'
import {Link} from 'react-router-dom'
import {Hits, Layout, LayoutBody, LayoutResults, Pagination, SearchkitManager, SearchkitProvider} from 'searchkit'
import {shortenTitle} from "./ItemUtils"
const host = 'https://es.iiif.cloud/m4'
const searchkit = new SearchkitManager(host)

const StandardGridItem = (props) => {
  const {bemBlocks, result} = props
  const source = result._source
  const manifestId = source.manifest
  const workspaceUri = '/view?manifest=' + manifestId
  const thumbnail = source.thumbnail + '/full/170,/0/default.jpg'
  console.log(props)
  return (
    <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
      <a
        href={workspaceUri}
      >
        {buildImage(thumbnail)}
      </a>
      <a
        href={workspaceUri}
      >
        <div  title={source.title} data-qa='title' dangerouslySetInnerHTML={{__html: shortenTitle(source.title)}}/>
      </a>
    </div>)
}

const handleMissingImage = (target) => {
  return target.src = 'https://upload.wikimedia.org/wikipedia/commons/9/9a/VisualEditor_icon_page-not-found-ltr.svg'
}

const buildImage = (imageSource) => {
  return (
    <img
      // crossOrigin=''
      width='170'
      onError={(e) => {
        handleMissingImage(e.target as HTMLImageElement)
      }}
      alt='thumbnail'
      src={imageSource}
    />
  )
}

export const DiscoveryComponent = () => {
    return (
      <div style={{marginLeft: '100px'}}>
        <SearchkitProvider searchkit={searchkit}>
          <Layout>
              <LayoutBody>
                <LayoutResults>
                  <Pagination showNumbers={true}/>
                  <Hits mod="sk-hits-grid" hitsPerPage={50} itemComponent={StandardGridItem}/>
                  <Pagination showNumbers={true}/>
                </LayoutResults>
              </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </div>
    )
}
