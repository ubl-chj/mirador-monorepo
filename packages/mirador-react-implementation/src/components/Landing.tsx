import React from 'react'
import {Link} from 'react-router-dom'
import {Layout, LogoWrapper, TopBar} from './ui'
export function Landing() {
  const pathname = '/view'
  return (
    <Layout>
      <TopBar>
        <LogoWrapper/>
      </TopBar>
      <main>
        <div style={{padding: '10px'}}>
          <h1>Handschriften Portal</h1>
          <Link
            title='View Mirador Workspace'
            to={{pathname}}
          >Mirador Workspace
          </Link>
          <br/>
          <Link
            to='/view?manifest=https://iiif.ub.uni-leipzig.de/0000003419/manifest.json'
          >An example Manuscript
          </Link>
          <br/>
          <Link
            to='/cmsExamplePage'
          >An example WordPress site from the UBL Blog
          </Link>
        </div>
      </main>
    </Layout>
  )
}
