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
import React from 'react'
import {ReduxContext} from '../utils'
import Typography from '@material-ui/core/Typography'

interface ISearchApp extends SearchkitComponentProps {
  routeConfig: {
    name: string,
    queryFields: {},
    refinementListFilters: {},
    sortingSelectorOptions: {}
  }
}

export class SearchApp extends SearchkitComponent<ISearchApp, any> {
  private routeConfig: any

  public constructor(props) {
    super(props)
    this.routeConfig = props.routeConfig
  }

  private buildRefinementListFilters(refinementListFilters): any {
    return Object.keys(refinementListFilters).map((id: any) => (
      <RefinementListFilter
        containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
        field={refinementListFilters[id].field}
        id={refinementListFilters[id].id}
        key={refinementListFilters[id].id}
        listComponent={ItemList}
        operator='AND'
        title={refinementListFilters[id].title}
      />
    ))
  }

  public render(): JSX.Element {
    const {name, queryFields, refinementListFilters, sortingSelectorOptions} = this.routeConfig
    return (
      <Layout>
        <Typography variant="subtitle1">{name}</Typography>
        <SearchBox autofocus={true} queryFields={queryFields} searchOnChange={true}/>
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
                hitComponents={[
                  {defaultOption: true, itemComponent: StandardGridItem, key: 'grid', title: 'Grid'},
                  {itemComponent: StandardListItem, key: 'list', title: 'List'},
                ]}
                hitsPerPage={12}
                scrollTo="body"
                sourceFilter={queryFields}
              />
            </ReduxContext.Provider>
            <Pagination showNumbers={true}/>
          </LayoutResults>
        </LayoutBody>
      </Layout>
    )
  }
}
