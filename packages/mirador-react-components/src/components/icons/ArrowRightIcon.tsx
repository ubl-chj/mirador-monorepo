import * as React from 'react'

export const ArrowRightIcon = () => {
  const svgStyle = () => {
    return {
      fill: 'white',
      left: '10px',
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
      <path d='M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z'/>
    </svg>
  )
}
