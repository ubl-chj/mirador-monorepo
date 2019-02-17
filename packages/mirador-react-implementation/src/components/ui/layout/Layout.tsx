import React from 'react'

const mixClasses = (...classes) => {
  return classes.filter((x) => !!x).join(' ')
}

export const Layout = (props) => {
  const sizeClass = props.size ? 'portal-layout__size-' + props.size : null
  return (
    <div className={mixClasses('portal-layout', props.className, sizeClass)}>
      {props.children}
    </div>
  )
}
