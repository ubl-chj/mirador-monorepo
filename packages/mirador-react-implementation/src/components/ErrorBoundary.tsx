import React from 'react'

export class ErrorBoundary extends React.Component {
  public static getDerivedStateFromError(error) {
    console.log(error)
    return { hasError: true }
  }

  public state: {
    error: string,
    errorInfo: any,
  }
  public constructor(props) {
    super(props)
    this.state = { error: null, errorInfo: null }
  }

  public componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    })
  }

  public render(): any {
    if (this.state.errorInfo) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      )
    }

    return this.props.children
  }
}
