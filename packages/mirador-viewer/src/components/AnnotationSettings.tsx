import React, {ReactElement} from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

interface IAnnotationSettings {
  displayAll: boolean
  displayAllDisabled: boolean
  t: any
  toggleAnnotationDisplay: any
}
/**
 * AnnotationSettings is a component to handle various annotation
 * display settings in the Annotation companion window
*/
export const AnnotationSettings: React.FC<IAnnotationSettings> = (props): ReactElement => {
  const {displayAll, displayAllDisabled, t, toggleAnnotationDisplay} = props;

  return (
    <FormControlLabel
      control={(
        <Switch
          checked={displayAll}
          disabled={displayAllDisabled}
          onChange={toggleAnnotationDisplay}
          value={displayAll ? 'all' : 'select'}
        />
      )}
      label={t('displayAllAnnotations')}
      labelPlacement="start"
    />
  );
}
