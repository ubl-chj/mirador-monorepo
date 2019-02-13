import React from 'react'
import {Link} from 'react-router-dom'

export function Landing() {
  const pathname = '/view'
  const example = '/view?manifest=https://iiif.ub.uni-leipzig.de/0000003419/manifest.json'
  return (
    <div>
      <h1>My Custom Mirador Portal</h1>
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
    </div>
  )
}
