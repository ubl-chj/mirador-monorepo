import React from 'react'
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
      <div>
        <WorkspaceControlPanel />
        <Component {...props} />
      </div>
    )
  }
  return HOC
}
