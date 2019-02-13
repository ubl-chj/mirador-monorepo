import React from 'react'
import {Link} from 'react-router-dom'

export function Landing() {
  const pathname = '/view'
  return (
    <div>
      <h1>My Custom Mirador Portal</h1>
      <Link
        title='View Mirador Workspace'
        to={{pathname}}
      >Mirador Workspace
      </Link>
    </div>
  )
}
