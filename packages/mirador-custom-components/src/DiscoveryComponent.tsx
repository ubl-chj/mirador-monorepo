import * as React from 'react'
import {Link} from 'react-router-dom'
import {ActionBar, ActionBarRow, GroupedSelectedFilters, Hits, HitsStats, ItemList, Layout, LayoutBody, LayoutResults,
  Pagination, Panel, RefinementListFilter, ResetFilters, SearchkitManager, SearchkitProvider,
  SideBar, SortingSelector, ViewSwitcherToggle} from 'searchkit'
import {shortenTitle} from "./ItemUtils"
const host = 'https://es.iiif.cloud/m4'
import routeConfig from './config/ubl.json'
const searchkit = new SearchkitManager(host)
const ReduxContext = React.createContext(null)

const setManifest = (actions, manifestId) => {
  actions.fetchManifest(manifestId)
  actions.addWindow({manifestId})
}

const StandardGridItem = (props) => {
  const {bemBlocks, result} = props
  const source = result._source
  const manifestId = source.manifest
  const workspaceUri = '/view?manifest=' + manifestId
  const thumbnail = source.thumbnail + '/full/170,/0/default.jpg'
  return (
    <ReduxContext.Consumer>{(actions) =>
      <div className={bemBlocks.item().mix(bemBlocks.container("item"))} data-qa="hit">
        <button onClick={() => setManifest(actions, manifestId)}>
          {buildImage(thumbnail)}
        </button>
        <a href={workspaceUri}>
          <div title={source.title} data-qa='title' dangerouslySetInnerHTML={{__html: shortenTitle(source.title)}}/>
        </a>
      </div>
    }
    </ReduxContext.Consumer>)
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

export const DiscoveryComponent = (props) => {
    return (
      <ReduxContext.Provider value={props}>
        <div style={{marginLeft: '100px'}}>
          <SearchkitProvider searchkit={searchkit}>
            <Layout>
                <LayoutBody>
                  <SideBar>
                    <RefinementListFilter
                      containerComponent={<Panel collapsable={true} defaultCollapsed={false}/>}
                      field={routeConfig.refinementListFilterDef1.field}
                      title={routeConfig.refinementListFilterDef1.title}
                      id={routeConfig.refinementListFilterDef1.id}
                      operator='AND'
                      listComponent={ItemList}
                    />
                  </SideBar>
                  <LayoutResults>
                    <ActionBar>
                      <ActionBarRow>
                        <HitsStats translations={{'hitstats.results_found': '{hitCount} results found'}}/>
                        <ViewSwitcherToggle/>
                        <SortingSelector options={routeConfig.sortingSelectorOptions}/>
                      </ActionBarRow>
                      <ActionBarRow>
                        <GroupedSelectedFilters/>
                        <ResetFilters/>
                      </ActionBarRow>
                    </ActionBar>
                    <Pagination showNumbers={true}/>
                    <Hits
                      mod="sk-hits-grid"
                      hitsPerPage={50}
                      itemComponent={StandardGridItem}
                    />
                    <Pagination showNumbers={true}/>
                  </LayoutResults>
                </LayoutBody>
            </Layout>
          </SearchkitProvider>
        </div>
      </ReduxContext.Provider>
    )
}
