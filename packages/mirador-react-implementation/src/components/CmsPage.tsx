import React from 'react'
import {Link} from 'react-router-dom'
import {Layout, LogoWrapper, TopBar} from './ui'
import { any } from 'prop-types';

class CmsPageResponse {
  id: number
  title: { rendered: string }
  content: { rendered: string }

  constructor(id = -1, title = {rendered: ''}, content = {rendered: ''}) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

export class CmsPage extends React.Component {
  state = { data: new CmsPageResponse() };

  componentDidMount() {
    fetch(`https://blog.ub.uni-leipzig.de/wp-json/wp/v2/pages/4226`)
      .then(res => res.json())
      .then(json => this.setState({ data: json }));
  }

  getPreRenderHtml(response: CmsPageResponse) {
    return {__html: response.content.rendered}
  }

  render() {
    return (
      <Layout>
        <TopBar>
          <LogoWrapper/>
        </TopBar>
        <main>
          <div style={{padding: '10px'}}>
            <h1>{this.state.data.title.rendered}</h1>
            <div dangerouslySetInnerHTML={this.getPreRenderHtml(this.state.data)}/>
          </div>
        </main>
      </Layout>
    );
  }
}