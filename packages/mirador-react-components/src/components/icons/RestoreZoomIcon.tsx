import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * RestoreZoomIcon ~
*/
export const RestoreZoomIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6,15H9v3h2V13H6Zm9-6V6H13v5h5V9Z" />
        <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8,8,8,0,0,1-8,8Z" />
      </svg>
    </SvgIcon>
  );
}
