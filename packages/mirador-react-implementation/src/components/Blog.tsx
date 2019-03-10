import {IWordPressAPIState, withPersistentDrawer} from '../api'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {ErrorBoundary} from '.'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import {styles} from '../styles'
import {withStyles} from '@material-ui/core'

const API_LINK = 'https://blog.ub.uni-leipzig.de/wp-json/wp/v2/posts?_embed'

interface ICmsPageComponent {
  classes: {
    card: string,
    drawerHeader: string,
    media: string,
    root: string,
  }
}

class CmsPageComponent extends React.Component<ICmsPageComponent, IWordPressAPIState> {
  private static buildDate(date): string {
    const event = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } //eslint-disable-line
    return event.toLocaleDateString('de-DE', options)
  }

  private static buildCardMedia(embedded): string {
    if (embedded['wp:featuredmedia']) {
      return embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
    } else {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
    }
  }

  private classes: {
    card: string,
    drawerHeader: string,
    media: string,
    root: string,
  }

  public constructor(props) {
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

  public async componentDidMount() {
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

  private buildTitleList(posts): any {
    return posts.map(({date, id, title, excerpt, _embedded}) => (
      <Card className={this.classes.card} key={id}>
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

  public render(): any {
    const {isLoading, posts} = this.state
    if (!isLoading) {
      return (
        <>
          {posts && posts.length &&
            (<ErrorBoundary>
              <div className={this.classes.drawerHeader} style={{ padding: 20 }} />
              <Grid item={Boolean(true)} xs={12}>
                <Typography gutterBottom={Boolean(true)} variant="h5">Blog der UB Leipzig</Typography>
                <Grid
                  alignItems="stretch"
                  className={this.classes.root}
                  container={Boolean(true)}
                  direction="row"
                  justify="center"
                  spacing={0}
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
