import React, {useEffect, useRef, useState} from 'react'
import {
  ActionBar,
  ActionBarRow,
  GroupedSelectedFilters,
  Hits,
  HitsStats,
  ItemList,
  Layout,
  LayoutBody,
  LayoutResults,
  Pagination,
  Panel,
  RefinementListFilter,
  ResetFilters,
  SearchBox,
  SearchkitManager,
  SearchkitProvider,
  SideBar,
  SortingSelector,
  ViewSwitcherToggle,
} from 'searchkit-fork'
import {StandardGridItem} from '.'
import {ReduxContext} from '../utils'

export const DiscoveryComponent = (props) => {
  const prevIndexRef: any = useRef()
  const {currentIndex} = props.discovery
  const routeConfig = props.discovery.indices[currentIndex]
  const host = routeConfig.host + '/' + currentIndex
  const sk = new SearchkitManager(host)
  const [searchkit, setSearchKit] = useState(sk)

  useEffect(() => {
    if (prevIndexRef.current !== currentIndex) {
      const nk = new SearchkitManager(host)
      setSearchKit(nk)
    }
    prevIndexRef.current = currentIndex
  })

  const buildSearchKitProvider = () => {
    const {queryFields, refinementListFilters, sortingSelectorOptions} = routeConfig
    return (
      <SearchkitProvider searchkit={searchkit}>
        <Layout>
          <SearchBox autofocus={true} searchOnChange={true} queryFields={queryFields}/>
          <LayoutBody>
            <SideBar>
              <RefinementListFilter
                containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
                field={refinementListFilters[1].field}
                title={refinementListFilters[1].title}
                id={refinementListFilters[1].id}
                operator='AND'
                listComponent={ItemList}
              />
              <RefinementListFilter
                containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
                field={refinementListFilters[2].field}
                title={refinementListFilters[2].title}
                id={refinementListFilters[2].id}
                operator='AND'
                listComponent={ItemList}
              />
              <RefinementListFilter
                containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
                field={refinementListFilters[3].field}
                title={refinementListFilters[3].title}
                id={refinementListFilters[3].id}
                operator='AND'
                listComponent={ItemList}
              />
            </SideBar>
            <LayoutResults>
              <ActionBar>
                <ActionBarRow>
                  <HitsStats translations={{'hitstats.results_found': '{hitCount} results found'}}/>
                  <ViewSwitcherToggle/>
                  <SortingSelector options={sortingSelectorOptions}/>
                </ActionBarRow>
                <ActionBarRow>
                  <GroupedSelectedFilters/>
                  <ResetFilters/>
                </ActionBarRow>
              </ActionBar>
              <Pagination showNumbers={true}/>
              <ReduxContext.Provider value={props}>
                <Hits
                  mod="sk-hits-grid"
                  hitsPerPage={50}
                  itemComponent={StandardGridItem}
                />
              </ReduxContext.Provider>
              <Pagination showNumbers={true}/>
            </LayoutResults>
          </LayoutBody>
        </Layout>
      </SearchkitProvider>
    )
  }

  return (
    buildSearchKitProvider()
  )
}
