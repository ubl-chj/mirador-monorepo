import * as React from 'react'

export const ArrowLeftIcon = () => {

  const svgStyle = () => {
    const absolute: 'absolute' = 'absolute'
    return {
      fill: 'white',
      left: '10px',
      position: absolute,
      top: '10px',
    }
  }
  return (
    <svg
      width="36px"
      height="36px"
      style={svgStyle()}
      viewBox="0 0 24 24"
    >
      <path d='M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z'/>
    </svg>
  )
}
