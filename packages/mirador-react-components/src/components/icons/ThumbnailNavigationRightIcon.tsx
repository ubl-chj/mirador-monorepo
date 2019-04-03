import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

/**
 * ThumbnailNavigationRightIcon ~
*/
export const ThumbnailNavigationRightIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0H24V24H0Z" fill="none" transform="translate(24) rotate(90)" />
        <path d="M3,3H21V5H3Z" transform="translate(24) rotate(90)" />
        <path d="M19,3H5V21H19ZM17,19H7V5H17Z" transform="translate(-2)" />
      </svg>
    </SvgIcon>
  );
}
