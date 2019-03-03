import {withStyles} from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import {withPersistentDrawer} from '../api'
import {styles} from '../styles'

class CmsPageResponse {
  id: number
  title: { rendered: string }
  content: { rendered: string }

  constructor(id = -1, title = {rendered: ''}, content = {rendered: ''}) {
    this.id = id
    this.title = title
    this.content = content
  }
}

class CmsPageComponent extends React.Component {
  static getPreRenderHtml(response: CmsPageResponse) {
    return {__html: response.content.rendered}
  }

  classes: any
  state = { data: new CmsPageResponse() }

  constructor(props) {
    super(props)
    this.classes = props.classes
  }

  componentDidMount() {
    fetch('https://blog.ub.uni-leipzig.de/wp-json/wp/v2/pages/4226')
      .then((res) => res.json())
      .then((json) => this.setState({ data: json }))
  }

  render() {
    return (
      <>
        <div className={this.classes.drawerHeader} />
        <Typography paragraph={true}>
          <h1>{this.state.data.title.rendered}</h1>
          <div dangerouslySetInnerHTML={CmsPageComponent.getPreRenderHtml(this.state.data)}/>
        </Typography>
      </>
    )
  }
}

export const CmsPage = withStyles(styles, { withTheme: true })(withPersistentDrawer(CmsPageComponent))
