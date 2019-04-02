import React, {ReactElement} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ns from '../config/css-ns';

interface IMiradorMenuButton {
  'aria-label': string
  children: any
  containerId: string
  dispatch: any
  TooltipProps: any
  wrapperClassName: any
}
/**
 * MiradorMenuButton ~ Wrap the given icon prop in an IconButton and a Tooltip.
 * This shares the passed in aria-label w/ the Tooltip (as title) and the IconButton
 * All props besides icon are spread to the IconButton component
*/
export const MiradorMenuButton: React.FC<IMiradorMenuButton> = (props): ReactElement => {
  const { 'aria-label': ariaLabel } = props;
  const {
    children,
    containerId,
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