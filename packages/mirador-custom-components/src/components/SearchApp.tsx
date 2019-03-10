import React from 'react'
import {
  ActionBar,
  ActionBarRow,
  GroupedSelectedFilters,
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
  SearchkitComponent,
  SearchkitComponentProps,
  SideBar,
  SortingSelector,
  ViewSwitcherHits,
  ViewSwitcherToggle,
} from 'searchkit'
import {StandardGridItem, StandardListItem} from '.'
import {ReduxContext} from '../utils'

interface ISearchApp extends SearchkitComponentProps {
  routeConfig: {}
}

export class SearchApp extends SearchkitComponent<ISearchApp, any> {
  routeConfig: any

  constructor(props) {
    super(props)
    this.routeConfig = props.routeConfig
  }

  buildRefinementListFilters(refinementListFilters) {
    return Object.keys(refinementListFilters).map((id: any) => (
      <RefinementListFilter
        containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
        field={refinementListFilters[id].field}
        title={refinementListFilters[id].title}
        id={refinementListFilters[id].id}
        key={refinementListFilters[id].id}
        operator='AND'
        listComponent={ItemList}
      />
    ))
  }

  render() {
    const {queryFields, refinementListFilters, sortingSelectorOptions} = this.routeConfig
    return (
      <Layout>
        <SearchBox autofocus={true} searchOnChange={true} queryFields={queryFields}/>
        <LayoutBody>
          <SideBar>
            {this.buildRefinementListFilters(refinementListFilters)}
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
            <ReduxContext.Provider value={this.props}>
              <ViewSwitcherHits
                hitsPerPage={12}
                sourceFilter={queryFields}
                hitComponents={[
                  {key: 'grid', title: 'Grid', itemComponent: StandardGridItem, defaultOption: true},
                  {key: 'list', title: 'List', itemComponent: StandardListItem},
                ]}
                scrollTo="body"
              />
            </ReduxContext.Provider>
            <Pagination showNumbers={true}/>
          </LayoutResults>
        </LayoutBody>
      </Layout>
    )
  }
}
