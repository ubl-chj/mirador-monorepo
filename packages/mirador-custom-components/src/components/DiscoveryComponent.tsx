import React from 'react'
import {
  SearchkitManager,
  SearchkitProvider,
} from 'searchkit'
import {SearchApp} from '.'

interface IDiscoveryComponent {
  discovery: {
    currentIndex: string,
    indices: {}
  },
}

export const DiscoveryComponent : React.FC<IDiscoveryComponent> = (props) => {
  const {currentIndex} = props.discovery
  const routeConfig = props.discovery.indices[currentIndex]
  const buildSearchKitManager = () => {
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
