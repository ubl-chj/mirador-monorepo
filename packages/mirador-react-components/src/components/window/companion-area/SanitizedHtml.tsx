import React, {ReactElement} from 'react';
import htmlRules from '../../../utils/htmlRules';
import ns from '../../../config/css-ns';
import { sanitize } from 'dompurify';

interface ISanitizedHtml {
  htmlString: string
  ruleSet: string
}

export const SanitizedHtml: React.FC<ISanitizedHtml> = (props): ReactElement => {
  const { htmlString, ruleSet } = props;
  return (
    <span
      className={ns('third-party-html')}
      dangerouslySetInnerHTML={{ // eslint-disable-line react/no-danger
        __html: sanitize(htmlString, htmlRules[ruleSet]),
      }}
    />
  );
}
