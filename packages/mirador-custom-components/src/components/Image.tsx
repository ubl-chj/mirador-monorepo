import * as React from "react"
import {handleMissingImage} from "../utils"

export const Image = (props) => {
  const {imageSource, width} = props
  return (
    <img
      // crossOrigin=''
      width={width}
      onError={(e) => { // tslint:disable-line
        handleMissingImage(e.target as HTMLImageElement)
      }}
      alt='thumbnail'
      src={imageSource}
    />
  )
}
