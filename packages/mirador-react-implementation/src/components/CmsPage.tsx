import {withStyles} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React, {Suspense} from 'react'
import {ErrorBoundary} from '.'
import {IWordPressAPIState, withPersistentDrawer} from '../api'
import {styles} from '../styles'

class CmsPageComponent extends React.Component<any, IWordPressAPIState> {
  classes: any
  constructor(props) {
    super(props)
    this.classes = props.classes
    this.state = {
      content: {
        rendered: null,
      },
      error: null,
      id: null,
      isLoading: false,
      title: {
        rendered: null,
      },
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch('https://blog.ub.uni-leipzig.de/wp-json/wp/v2/posts/7295')
      const data = await response.json()
      this.setState({ content: data.content, id: data.id, title: data.title })
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      })
    }
  }

  render() {
    const {content, title} = this.state
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          {content &&
            (<>
                <div className={this.classes.drawerHeader}/>
                <Typography variant="h6">{title.rendered}</Typography>
                <Typography component={'span'}>
                  <div dangerouslySetInnerHTML={{__html: content.rendered}}/>
                </Typography>
              </>)
          }
        </Suspense>
      </ErrorBoundary>
    )
  }
}

export const CmsPage = withStyles(styles, { withTheme: true })(withPersistentDrawer(CmsPageComponent))
