import React, { ReactElement, useEffect, useState } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import {ErrorBoundary} from '.'
import Grid from '@material-ui/core/Grid'
import {PersistentDrawer} from '../api'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from "@material-ui/styles"
import {styles} from '../styles'

const API_LINK = process.env.REACT_APP_WP_API

interface ICmsPageComponent {
  classes: {
    card: string,
    drawerHeader: string,
    media: string,
    root: string,
  },
  posts: any
}

const useStyles = makeStyles(styles)

const CmsPageComponent: React.FC<ICmsPageComponent> = (): ReactElement => {
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(null);
  const buildDate = (date): string => {
    const event = new Date(date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } //eslint-disable-line
    return event.toLocaleDateString('de-DE', options)
  }

  const buildCardMedia = (embedded): string => {
    if (embedded['wp:featuredmedia']) {
      return embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
    } else {
      return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
    }
  }
  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      const response = await fetch(API_LINK)
      const data = await response.json()
      setPosts(data)
      setIsLoading(false);
    }
    fetchAPI()
  }, []);

  const buildTitleList = (posts): any => {
    return posts.map(({date, id, title, excerpt, _embedded}) => (
      <Card className={classes.card} key={id}>
        <CardMedia
          className={classes.media}
          image={buildCardMedia(_embedded)}
          title={title.rendered}
        />
        <CardContent>
          <Typography component='span'><strong><div dangerouslySetInnerHTML={{__html: title.rendered}}/></strong></Typography>
          <Typography component='title'>{buildDate(date)}</Typography>
          <Typography component='span'>
            <div dangerouslySetInnerHTML={{__html: excerpt.rendered}}/>
          </Typography>
        </CardContent>
      </Card>
    ))
  }

  return (
    <>
      {
        isLoading ? (<div style={{marginTop: '100px'}}>Loading...</div>)
          : (<>
              {posts && posts.length &&
                (<ErrorBoundary>
                  <div
                    className={classes.drawerHeader}
                    style={{padding: 20}}/>
                  <Grid item={Boolean(true)} xs={12}>
                    <Typography
                      gutterBottom={Boolean(true)}
                      variant="h5">Blog der UB Leipzig</Typography>
                    <Grid
                      alignItems="stretch"
                      className={classes.root}
                      container={Boolean(true)}
                      direction="row"
                      justify="center"
                      spacing={0}>
                      {buildTitleList(posts)}
                    </Grid>
                  </Grid>
                </ErrorBoundary>)
              }
            </>)
      }
    </>)
}

export const CmsPage = (props) => { return (<PersistentDrawer component={<CmsPageComponent {...props}/>}/>) }

