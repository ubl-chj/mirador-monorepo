import React from 'react'
import {LogoWrapper} from '../components/ui'
import {Layout, TopBar} from '../components/ui/layout'
import WorkspaceControlPanel from '../components/ui/WorkspaceControlPanel'

/**
 *
 * @param Component
 * @returns {*}
 */
export const withControlPanel = (Component) => {
  /**
   *
   * @param props
   * @constructor
   */
  const HOC = (props) => {
    return (
      <Layout>
        <TopBar>
          <LogoWrapper/>
        </TopBar>
        <WorkspaceControlPanel />
        <Component {...props} />
      </Layout>
    )
  }
  return HOC
}
