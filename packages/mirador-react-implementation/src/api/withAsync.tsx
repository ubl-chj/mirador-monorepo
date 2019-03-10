import React from 'react'

export const withAsync = (importComponent): any => {
  return class HOC extends React.Component {
    public state = {
      component: null,
    }

    public componentDidMount(): any {
      importComponent()
        .then((cmp) => {
          this.setState({component: cmp.default})
        })
    }

    public render(): any {
      const C = this.state.component
      return C ? <C {...this.props}/> : null
    }
  }
}
