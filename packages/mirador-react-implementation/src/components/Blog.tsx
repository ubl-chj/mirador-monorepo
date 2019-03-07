import {withStyles} from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import React from 'react'
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

  static buildCardMedia(embedded) {
    if (embedded['wp:featuredmedia']) {
      return embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
    } else {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
    }
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
      this.setState({ isLoading: true })
      const response = await fetch(API_LINK)
      const data = await response.json()
      this.setState({ isLoading: false, posts: data })
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
        <CardMedia
          className={this.classes.media}
          image={CmsPageComponent.buildCardMedia(_embedded)}
          title={title.rendered}
        />
        <CardContent>
          <Typography component='span'><strong><div dangerouslySetInnerHTML={{__html: title.rendered}}/></strong></Typography>
          <Typography component='title'>{CmsPageComponent.buildDate(date)}</Typography>
          <Typography component='span'>
            <div dangerouslySetInnerHTML={{__html: excerpt.rendered}}/>
          </Typography>
        </CardContent>
      </Card>
    ))
  }

  render() {
    const {isLoading, posts} = this.state
    if (!isLoading) {
      return (
        <>
          {posts && posts.length &&
            (<ErrorBoundary>
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
            </ErrorBoundary>)
          }
          </>
      )
    }
    return <div style={{marginTop: '100px'}}>Loading...</div>
  }
}

export const CmsPage = withStyles(styles, { withTheme: true })(withPersistentDrawer(CmsPageComponent))
