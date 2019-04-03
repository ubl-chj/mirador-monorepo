import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * ThumbnailNavigationBottomIcon ~
*/
export const ThumbnailNavigationBottomIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M3,3H21V5H3Z" transform="translate(0 16)" />
        <path d="M21,5H3V19H21ZM19,17H5V7H19Z" transform="translate(0 -2)" />
      </svg>
    </SvgIcon>
  );
}
