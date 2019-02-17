import React from 'react'
import {Link} from 'react-router-dom'
import {Layout} from './ui/layout'
export function Landing() {
  const pathname = '/view'
  return (
    <main>
      <Layout>
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
      </Layout>
    </main>
  )
}
