import React from 'react'

export function withInitialization() {
  return function HOCFactory(WrappedComponent) {
    return class HOC extends React.Component {
      /**
       *
       * @returns {*}
       */
      render() {
        return <WrappedComponent {...this.props} />
      }
    }
  }
}
