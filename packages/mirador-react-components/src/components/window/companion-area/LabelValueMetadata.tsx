import React, {ReactElement} from 'react';
import { SanitizedHtml } from './SanitizedHtml';
import Typography from '@material-ui/core/Typography';
import ns from '../../../config/css-ns';

interface ILabelValueMetadata {
  labelValuePairs: any
}
/**
 * Renders label/value pair metadata in a dl
 * @prop {object} labelValuePair
 */
export const LabelValueMetadata: React.FC<ILabelValueMetadata> = (props): ReactElement => {
  const { labelValuePairs } = props;

  if (labelValuePairs.length === 0) {
    return (<></>);
  }

  /* eslint-disable react/no-array-index-key */
  // Disabling array index key for dt/dd elements as
  // they are intended to display metadata that will not
  // need to be re-rendered internally in any meaningful way
  return (
    <dl className={ns('label-value-metadata')}>
      {labelValuePairs.reduce((acc, labelValuePair, i) => acc.concat([
        <dt key={`label-${i}`}>
          <Typography component="span" variant="subtitle2">{labelValuePair.label }</Typography>
        </dt>,
        <dd key={`value-${i}`}>
          <Typography variant="body1">
            <SanitizedHtml htmlString={labelValuePair.value} ruleSet="iiif" />
          </Typography>
        </dd>,
      ]), [])}
    </dl>
  );
}
