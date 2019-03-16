import React, {ReactElement} from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

interface IMetadataList {
  labelValuePairs: []
  labelValuePair:
  {
    label: string,
    value: string
  }
}

export const MetadataList: React.FC<IMetadataList> = (props): ReactElement => {
  const { labelValuePairs } = props;

  if (labelValuePairs.length === 0) {
    return (<></>);
  }

  return (
    <List>
      {labelValuePairs.reduce((acc, labelValuePair: IMetadataList["labelValuePair"], i) => acc.concat([
        <ListItem
          dense
          disableGutters
          divider
          key={`label-${i}`}
          style={{ display: 'block' }}
        >
          <div>
            <Typography
              color="secondary"
              component="span"
              variant="subtitle2"
            >
              {labelValuePair.label}
            </Typography>
          </div>
          <div>
            <Typography
              component="span"
              variant="body1"
            >
              <span dangerouslySetInnerHTML={{__html: labelValuePair.value}}/>
            </Typography>
          </div>
        </ListItem>,
      ]), [])}
    </List>
  )
}

