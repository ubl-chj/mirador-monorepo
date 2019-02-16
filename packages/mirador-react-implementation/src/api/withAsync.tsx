import React from 'react'

export const withAsync = (importComponent) => {
  return class HOC extends React.Component {
      state = {
        component: null,
      }

      componentDidMount() {
        importComponent()
          .then((cmp) => {
            this.setState({component: cmp.default})
          })
      }

      render() {
        const C = this.state.component
        return C ? <C {...this.props}/> : null
      }
  }
}
