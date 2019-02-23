import Home from '@material-ui/icons/Home'
import * as React from 'react'
import {Link} from 'react-router-dom'

export const LogoWrapper = () => {
  return (
    <div className='portal-layout__logo'>
      <Link className='portal-layout__logo' to='/'>
        <Home/>
      </Link>
    </div>
  )
}
