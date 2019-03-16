import React, {ReactElement} from "react"
import Typography from '@material-ui/core/Typography';

interface IManifestURI {
  manifestId: string
}

export const ManifestURI: React.FC<IManifestURI> = (props): ReactElement => {
  const {manifestId} = props

  const buildManifestURI = (): string => {
    return `<a href=${manifestId} target='_blank' rel='noopener noreferrer'>${manifestId}</a>`
  }

  return (
    manifestId && (
      <>
        <div>
          <Typography
            color="secondary"
            component="span"
            variant="subtitle2"
          >Manifest
          </Typography>
        </div>
        <div dangerouslySetInnerHTML={{__html: buildManifestURI()}}/>
      </>
    )
  )
}
