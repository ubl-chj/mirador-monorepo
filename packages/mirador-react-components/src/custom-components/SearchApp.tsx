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
  SearchkitComponentProps,
  SideBar,
  SortingSelector,
  ViewSwitcherHits,
  ViewSwitcherToggle,
} from 'searchkit'
import React, {ReactElement} from 'react'
import {StandardGridItem, StandardListItem} from '.'
import {ReduxContext} from './utils'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'

interface ISearchApp extends SearchkitComponentProps {
  routeConfig: {
    name: string,
    queryFields: any,
    refinementListFilters: any,
    sortingSelectorOptions: any,
  }
}

export const SearchApp: React.FC<ISearchApp> = (props): ReactElement => {
  const {name, queryFields, refinementListFilters, sortingSelectorOptions} = props.routeConfig
  const hasMinWidth = useMediaQuery('(min-width:500px)')

  const buildRefinementListFilters = (refinementListFilters) => {
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

  return (
    <Layout>
      <Typography variant="subtitle1">{name}</Typography>
      <SearchBox autofocus={true} queryFields={queryFields} searchOnChange={true}/>
      <LayoutBody>
        {hasMinWidth ?
          <SideBar>
            {buildRefinementListFilters(refinementListFilters)}
          </SideBar> : null }
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
