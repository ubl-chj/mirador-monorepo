import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import {Link} from 'react-router-dom'
import {withPersistentDrawer} from '../api'
import {styles} from '../styles'

const LandingComponent = (props) => {
  const pathname = '/view'
  const {classes} = props
  return (
    <>
      <div className={classes.drawerHeader} />
      <Grid container={Boolean(true)} className={classes.root} spacing={24}>
        <Grid item={Boolean(true)} xs={12}>
          <Grid container={Boolean(true)} justify="center" spacing={24}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://media.nga.gov/iiif/public/objects/3/9/2/3/6/39236-primary-0-nativeres.ptif/full/170,/0/default.jpg"
                  title="Mirador"
                />
                <CardContent>
                  <Typography paragraph={true}>
                    <Link
                      title='View Mirador Workspace'
                      to={{pathname}}
                    >Mirador Workspace
                    </Link>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider/>
            </Card>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0034/0000003419/00000002.jpx/full/170,/0/default.jpg"
                  title="Leipzig, Universitätsbibliothek Leipzig, Fragm. lat. 102"
                />
                <CardContent>
                  <Typography paragraph={true}>
                    <Link
                      to='/view?manifest=https://iiif.ub.uni-leipzig.de/0000003419/manifest.json'
                    >An example Manuscript
                    </Link>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <Divider/>
            </Card>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0042/0000004253/00000062.jpx/full/170,/0/default.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography paragraph={true}>
                    <Link
                      to='/cms'
                    >An example WordPress site from the UBL Blog
                    </Link>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      </>
  )
}

export const Landing = withStyles(styles, { withTheme: true })(withPersistentDrawer(LandingComponent))
