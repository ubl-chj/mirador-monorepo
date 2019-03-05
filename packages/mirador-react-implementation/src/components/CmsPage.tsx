import {withStyles} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React, {Suspense} from 'react'
import {ErrorBoundary} from '.'
import {IWordPressAPIState, withPersistentDrawer} from '../api'
import {styles} from '../styles'

const API_LINK = 'https://blog.ub.uni-leipzig.de/wp-json/wp/v2/posts?_embed'

class CmsPageComponent extends React.Component<any, IWordPressAPIState> {
  static buildDate(date) {
    const event = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return event.toLocaleDateString('de-DE', options)
  }

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
      posts: null,
      title: {
        rendered: null,
      },
    }
  }

  async componentDidMount() {
    try {
      const response = await fetch(API_LINK)
      const data = await response.json()
      this.setState({ posts: data })
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      })
    }
  }

  buildTitleList(posts): any {
    return posts.map(({date, id, title, excerpt, _embedded}) => (
      <Card key={id} className={this.classes.card}>
        <CardActionArea>
          {_embedded['wp:featuredmedia']
            ? <CardMedia
              className={this.classes.media}
              image={_embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url}
              title={title.rendered}
            /> : null
          }
          <CardContent>
            <Typography component='span'><strong><div dangerouslySetInnerHTML={{__html: title.rendered}}/></strong></Typography>
            <Typography component='title'>{CmsPageComponent.buildDate(date)}</Typography>
            <Typography component='span'>
              <div dangerouslySetInnerHTML={{__html: excerpt.rendered}}/>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    ))
  }

  render() {
    const {posts} = this.state
    if (posts && posts.length) {
      return (
        <ErrorBoundary>
          <Suspense fallback={<div>Loading...</div>}>
            {posts.length &&
            (<>
              <div style={{ padding: 20 }} className={this.classes.drawerHeader} />
              <Grid item={Boolean(true)} xs={12}>
                <Typography variant="h5" gutterBottom={Boolean(true)}>Blog der UB Leipzig</Typography>
                <Grid
                  container={Boolean(true)}
                  className={this.classes.root}
                  spacing={0}
                  alignItems="stretch"
                  justify="center"
                  direction="row"
                >
                  {this.buildTitleList(posts)}
                </Grid>
              </Grid>
              </>)
            }
          </Suspense>
        </ErrorBoundary>
      )
    }
    return null
  }
}

export const CmsPage = withStyles(styles, { withTheme: true })(withPersistentDrawer(CmsPageComponent))
