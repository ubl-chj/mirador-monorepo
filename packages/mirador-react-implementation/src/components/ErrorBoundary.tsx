import React from 'react'

export class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true }
  }

  state: {
    hasError: boolean,
  }
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }

    return this.props.children
  }
}
