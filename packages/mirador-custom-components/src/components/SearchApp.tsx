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
  SideBar,
  SortingSelector,
  ViewSwitcherHits,
  ViewSwitcherToggle,
} from 'searchkit'
import {StandardGridItem, StandardListItem} from '.'
import {ReduxContext} from '../utils'

export class SearchApp extends SearchkitComponent<any, any> {
  routeConfig: any
  props: any

  constructor(props) {
    super(props)
    this.routeConfig = props.routeConfig
  }

  render() {
    const {queryFields, refinementListFilters, sortingSelectorOptions} = this.routeConfig
    return (
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
