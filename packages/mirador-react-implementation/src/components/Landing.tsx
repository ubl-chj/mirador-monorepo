import React, {ReactElement} from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import {Link} from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import {styles} from '../styles'
import {withPersistentDrawer} from '../api'
import {withStyles} from '@material-ui/core/styles'

interface ILandingComponent {
  classes: {
    card: string,
    drawerHeader: string,
    media: string
  }
}


const LandingComponent: React.FC<ILandingComponent> = (props): ReactElement => {
  const {classes} = props

  const buildCard = (imageSrc, linkPath, title, text) => {
    return (
      <Link
        title={title}
        to={linkPath}
      >
        <Card className={classes.card}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={imageSrc}
              title={title}
            />
            <CardContent>
              <Typography paragraph={true}>{text}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>)
  }

  return (
    <>
      <div className={classes.drawerHeader} />
        <Grid alignItems="center" container={Boolean(true)} justify="center" spacing={0} style={{height: '100%'}}>
          {buildCard(
            'https://media.nga.gov/iiif/public/objects/3/9/2/3/6/39236-primary-0-nativeres.ptif/full/170,/0/default.jpg',
            '/view',
            'View Mirador Workspace',
            'Mirador Workspace',
          )}
          {buildCard(
            'https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0034/0000003419/00000002.jpx/full/170,/0/default.jpg',
            '/view?manifest=https://iiif.ub.uni-leipzig.de/0000003419/manifest.json',
            'Leipzig, Universitätsbibliothek Leipzig, Fragm. lat. 102',
            'An example Manuscript',
          )}
          {buildCard(
            'https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0042/0000004253/00000062.jpx/full/170,/0/default.jpg',
            '/cms',
            'Recent Beitrage from the UBL Blog',
            'UBL Blog',
          )}
        </Grid>
      </>
  )
}

export const Landing = withStyles(styles, { withTheme: true })(withPersistentDrawer(LandingComponent))
