import React, {ReactElement} from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import {NavLink} from 'react-router-dom'
import {PersistentDrawer} from '../api'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles'
import {styles} from '../styles'

interface ILandingComponent {
  classes: {
    card: string,
    drawerHeader: string,
    media: string
  }
}

const useStyles = makeStyles(styles)

const LandingComponent: React.FC<ILandingComponent> = (): ReactElement => {
  const classes = useStyles()

  const cards = [
    {
      imageSrc: 'https://media.nga.gov/iiif/public/objects/3/9/2/3/6/39236-primary-0-nativeres.ptif/full/170,/0/default.jpg',
      index: 0,
      linkPath: '/view',
      text: 'Mirador Workspace',
      title: 'View Mirador Workspace',
    },
    {
      imageSrc: 'https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0034/0000003419/00000002.jpx/full/170,/0/default.jpg',
      index: 1,
      linkPath: '/view?manifest=https://iiif.ub.uni-leipzig.de/0000003419/manifest.json',
      text: 'An example Manuscript',
      title: 'Leipzig, Universitätsbibliothek Leipzig, Fragm. lat. 102',
    },
    {
      imageSrc: 'https://iiif.ub.uni-leipzig.de/iiif/j2k/0000/0042/0000004253/00000062.jpx/full/170,/0/default.jpg',
      index: 2,
      linkPath: '/cms',
      text: 'UBL Blog',
      title: 'Recent Beitrage from the UBL Blog',
    }
  ]

  const buildCards = (cards): JSX.Element => {
    return cards.map((card) =>
      <Card
        className={classes.card}
        key={card.index}
      >
        <NavLink title={card.title} to={card.linkPath}>
          <CardMedia
            className={classes.media}
            image={card.imageSrc}
            title={card.title}
          />
          <CardContent>
            <Typography paragraph={true}>{card.text}</Typography>
          </CardContent>
        </NavLink>
      </Card>)
  }

  return (
    <>
      <div className={classes.drawerHeader} />
        <Grid
          alignItems="center"
          container={Boolean(true)}
          justify="center"
          spacing={0}
          style={{height: '100%'}}
        >
          {buildCards(cards)}
        </Grid>
      </>
  )
}

const drawer = (props) => { return (<PersistentDrawer component={<LandingComponent {...props}/>}/>) }
export const Landing = drawer
