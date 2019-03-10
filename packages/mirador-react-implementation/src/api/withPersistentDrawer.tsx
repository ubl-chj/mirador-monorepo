import CssBaseline from '@material-ui/core/CssBaseline'
import {PersistentDrawerLeft} from '../components/ui'
import React from 'react'
import classNames from 'classnames'

/**
 *
 * @param Component
 * @returns {*}
 */
export const withPersistentDrawer = (Component): any => {
  /**
   *
   * @param props
   * @constructor
   */
  return class HOC extends React.Component {
    public classes: any
    public state = {
      open: false,
    }
    public constructor(props) {
      super(props)
      this.classes = props.classes
    }

    private handleDrawerOpen = () => {
      this.setState({ open: true })
    }

    private handleDrawerClose = () => {
      this.setState({ open: false })
    }

    public render(): any {
      const {open} = this.state
      return (
        <div className={this.classes.root}>
          <CssBaseline />
          <PersistentDrawerLeft
            handleDrawerClose={this.handleDrawerClose}
            handleDrawerOpen={this.handleDrawerOpen}
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
