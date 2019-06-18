import React, {ReactElement} from 'react'
import {handleMissingImage} from './utils'

interface IImage {
  imageSource: string,
  width: number
}

export const Image: React.FC<IImage> = (props): ReactElement => {
  const {imageSource, width} = props
  return (
    <img
      // crossOrigin=''
      alt='thumbnail'
      onError={(e) => {
        handleMissingImage(e.target as HTMLImageElement)
      }}
      src={imageSource}
      width={width}
    />
  )
}
