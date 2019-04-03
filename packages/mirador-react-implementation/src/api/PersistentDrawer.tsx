import {createMuiTheme, makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'
import {PersistentDrawerLeft} from '../components/ui'
import React from 'react'
import {ThemeProvider} from "@material-ui/styles"
import classNames from 'classnames'
import {localConfig} from '@mirador/configuration'
import {styles} from '../styles'

interface IPersistentDrawer extends React.FC{
  component: any
}

export const PersistentDrawer: React.FC<any> = ({component}): any => {
  const useStyles = makeStyles(styles)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const defaultTheme = localConfig.theme
  const theme = createMuiTheme(defaultTheme)
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <PersistentDrawerLeft
          handleDrawerClose={handleDrawerClose}
          handleDrawerOpen={handleDrawerOpen}
          open={open}
        />
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          {component}
        </main>
      </div>
    </ThemeProvider>
  )
}
