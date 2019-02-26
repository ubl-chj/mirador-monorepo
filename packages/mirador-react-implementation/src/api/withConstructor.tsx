import React from 'react'

/**
 *
 * @param Component
 * @returns {*}
 */
export const withConstructor = (Component) => {
  /**
   *
   * @param props
   * @constructor
   */
  const HOC = (props) => {
    return (<Component {...props} />)
  }
  return HOC
}
