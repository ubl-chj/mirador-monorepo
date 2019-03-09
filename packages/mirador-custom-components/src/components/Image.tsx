import * as React from 'react'
import {handleMissingImage} from '../utils'

interface IImage {
  imageSource: string,
  width: number
}

export const Image : React.FC<IImage> = (props) => {
  const {imageSource, width} = props
  return (
    <img
      // crossOrigin=''
      width={width}
      onError={(e) => {
        handleMissingImage(e.target as HTMLImageElement)
      }}
      alt='thumbnail'
      src={imageSource}
    />
  )
}
