import React, {ReactElement} from 'react'
import {
  SearchkitManager,
  SearchkitProvider,
} from 'searchkit'
import {SearchApp} from '.'
import {getDiscovery} from "./state/selectors"

export const DiscoveryComponent: React.FC<any> = (props): ReactElement => {
  const discovery = getDiscovery()
  const {currentIndex} = discovery
  const routeConfig = discovery.indices[currentIndex]
  const buildSearchKitManager = (): SearchkitManager => {
    const host = routeConfig.host + '/' + currentIndex
    const options = {
      timeout: 20000,
    }
    return new SearchkitManager(host, options)
  }
  const sk = buildSearchKitManager()

  return (
    <SearchkitProvider searchkit={sk}>
      <SearchApp routeConfig={routeConfig} {...props}/>
    </SearchkitProvider>
  )
}
