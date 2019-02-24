import * as React from 'react'
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
import IndexSelector from '../containers/IndexSelector'
import {ReduxContext} from '../utils'

export class DiscoveryComponent extends React.Component {
  props: any
  routeConfig: any
  host: string
  searchkit: any
  state: {
    currentIndex: string,
  }
  constructor(props) {
    super(props)
    this.routeConfig = props.discovery.indices[props.discovery.currentIndex]
    this.host = this.routeConfig.host + '/' + props.discovery.currentIndex
    this.searchkit = new SearchkitManager(this.host)
    this.state = {
      currentIndex: props.discovery.currentIndex,
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.discovery.currentIndex !== this.props.discovery.currentIndex) {
      this.setState({currentIndex: this.props.discovery.currentIndex})
      this.props.setWorkspaceAddVisibility(!this.props.isWorkspaceAddVisible)
    }
  }

  render() {
    return (
      <div style={{marginLeft: '100px'}}>
        <SearchkitProvider searchkit={this.searchkit}>
          <Layout>
            <SearchBox autofocus={true} searchOnChange={true} queryFields={this.routeConfig.queryFields}/>
            <IndexSelector/>
            <LayoutBody>
              <SideBar>
                <RefinementListFilter
                  containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
                  field={this.routeConfig.refinementListFilterDef1.field}
                  title={this.routeConfig.refinementListFilterDef1.title}
                  id={this.routeConfig.refinementListFilterDef1.id}
                  operator='AND'
                  listComponent={ItemList}
                />
                <RefinementListFilter
                  containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
                  field={this.routeConfig.refinementListFilterDef2.field}
                  title={this.routeConfig.refinementListFilterDef2.title}
                  id={this.routeConfig.refinementListFilterDef2.id}
                  operator='AND'
                  listComponent={ItemList}
                />
                <RefinementListFilter
                  containerComponent={<Panel collapsable={true} defaultCollapsed={true}/>}
                  field={this.routeConfig.refinementListFilterDef3.field}
                  title={this.routeConfig.refinementListFilterDef3.title}
                  id={this.routeConfig.refinementListFilterDef3.id}
                  operator='AND'
                  listComponent={ItemList}
                />
              </SideBar>
              <LayoutResults>
                <ActionBar>
                  <ActionBarRow>
                    <HitsStats translations={{'hitstats.results_found': '{hitCount} results found'}}/>
                    <ViewSwitcherToggle/>
                    <SortingSelector options={this.routeConfig.sortingSelectorOptions}/>
                  </ActionBarRow>
                  <ActionBarRow>
                    <GroupedSelectedFilters/>
                    <ResetFilters/>
                  </ActionBarRow>
                </ActionBar>
                <Pagination showNumbers={true}/>
                <ReduxContext.Provider value={this.props}>
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
      </div>
    )
  }
}
