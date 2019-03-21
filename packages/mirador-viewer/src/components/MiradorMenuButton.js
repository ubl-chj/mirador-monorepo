import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ns from '../config/css-ns';

/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/
export function MiradorMenuButton(props) {
  const { 'aria-label': ariaLabel } = props;
  const {
    children,
    containerId,
    dispatch,
    TooltipProps,
    wrapperClassName,
    ...iconButtonProps
  } = props;

  return (
    <Tooltip
      PopperProps={{
        container: document.querySelector(`#${containerId} .${ns('viewer')}`),
      }}
      title={ariaLabel}
      {...TooltipProps}
    >
      {/*
        Wrap IconButton in span so it can receive mouse events
        (e.g. show the tooltip) even if the IconButton is disabled
      */}
      <span className={wrapperClassName}>
        <IconButton {...iconButtonProps}>
          {children}
        </IconButton>
      </span>
    </Tooltip>
  );
}

MiradorMenuButton.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
  containerId: PropTypes.string.isRequired,
  dispatch: PropTypes.func,
  TooltipProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  wrapperClassName: PropTypes.string,
};

MiradorMenuButton.defaultProps = {
  dispatch: () => {},
  TooltipProps: {},
  wrapperClassName: null,
};
