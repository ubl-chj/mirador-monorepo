import { DiscoveryContainer, WorkspaceControlPanel } from '@mirador/custom-components';
import React, {ReactElement} from 'react';
import { makeStyles } from '@material-ui/styles'
import Workspace from '../containers/Workspace';
import classNames from 'classnames';
import ns from '../config/css-ns';

import {useTranslation} from "react-i18next"

interface IWorkspaceArea {
  isWorkspaceAddVisible: boolean
  isWorkspaceControlPanelVisible: boolean
}

const useStyles = makeStyles(theme => ({
  background: {
    background: theme.palette.background.default,
  },
}));

/**
 * This is the top level Mirador component.
 * @prop {Object} manifests
 */
export const WorkspaceArea: React.FC<IWorkspaceArea> = (props): ReactElement => {
  const classes = useStyles()
  const {t} = useTranslation()
  const {isWorkspaceAddVisible, isWorkspaceControlPanelVisible} = props;

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
