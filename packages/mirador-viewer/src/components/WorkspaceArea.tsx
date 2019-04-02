import { DiscoveryContainer, WorkspaceControlPanel } from '@mirador/custom-components';
import React, {ReactElement} from 'react';
import PropTypes from 'prop-types';
import Workspace from '../containers/Workspace';
import classNames from 'classnames';
import ns from '../config/css-ns';

interface IWorkspaceArea {
  classes: any
  isWorkspaceAddVisible: boolean
  isWorkspaceControlPanelVisible: boolean
  t: any
}
/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export const WorkspaceArea: React.FC<IWorkspaceArea> = (props): ReactElement => {
  const {classes, isWorkspaceAddVisible, isWorkspaceControlPanelVisible, t} = props;

  return (
    <main aria-label={t('workspace')} className={classNames(classes.background, ns('viewer'))}>
      {
        isWorkspaceControlPanelVisible
          && <WorkspaceControlPanel {...this.props}/>
      }
      {
        isWorkspaceAddVisible
          ? (
            <>
              <DiscoveryContainer />
            </>
          )
          : <Workspace />
      }
    </main>
  );
}



WorkspaceArea.propTypes = {
  classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types,
  isWorkspaceAddVisible: PropTypes.bool,
  isWorkspaceControlPanelVisible: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
};

WorkspaceArea.defaultProps = {
  isWorkspaceAddVisible: false,
};
