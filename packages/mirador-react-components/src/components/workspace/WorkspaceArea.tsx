import {DiscoveryComponent, WorkspaceControlPanel} from '../../custom-components';
import React, {ReactElement} from 'react';
import Workspace from '../../containers/workspace/Workspace';
import classNames from 'classnames';
import {getIsWorkspaceAddVisible, getIsWorkspaceControlPanelVisible} from '@mirador/core'
import { makeStyles } from '@material-ui/styles'
import ns from '../../config/css-ns';
import {useTranslation} from "react-i18next"

interface IWorkspaceArea {
  isWorkspaceAddVisible: boolean
  isWorkspaceControlPanelVisible: boolean
}

const useStyles = makeStyles(theme => ({
  background: {
    background: (theme as any).palette.background.default,
  },
}));

export const WorkspaceArea: React.FC<any> = (props): ReactElement => {
  const classes = useStyles({})
  const {t} = useTranslation()
  const isWorkspaceAddVisible = getIsWorkspaceAddVisible()
  const isWorkspaceControlPanelVisible = getIsWorkspaceControlPanelVisible()

  return (
    <main aria-label={t('workspace')} className={classNames(classes.background, ns('viewer'))}>
      {
        isWorkspaceControlPanelVisible
          && <WorkspaceControlPanel {...props}/>
      }
      {
        isWorkspaceAddVisible
          ? (
            <>
              <DiscoveryComponent />
            </>
          )
          : <Workspace />
      }
    </main>
  );
}
