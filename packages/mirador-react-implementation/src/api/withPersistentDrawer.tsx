import CssBaseline from '@material-ui/core/CssBaseline'
import classNames from 'classnames'
import React from 'react'
import {PersistentDrawerLeft} from '../components/ui'

/**
 *
 * @param Component
 * @returns {*}
 */
export const withPersistentDrawer = (Component) => {
  /**
   *
   * @param props
   * @constructor
   */
  return class HOC extends React.Component {
    classes: any
    state = {
      open: false,
    }
    constructor(props) {
      super(props)
      this.classes = props.classes
    }

    handleDrawerOpen = () => {
      this.setState({ open: true })
    }

    handleDrawerClose = () => {
      this.setState({ open: false })
    }

    render() {
      const {open} = this.state
      return (
        <div className={this.classes.root}>
          <CssBaseline />
          <PersistentDrawerLeft
            handleDrawerOpen={this.handleDrawerOpen}
            handleDrawerClose={this.handleDrawerClose}
            open={open}
          />
          <main
            className={classNames(this.classes.content, {
              [this.classes.contentShift]: open,
            })}
          >
            <Component {...this.props} />
          </main>
        </div>
      )
    }
  }
}
