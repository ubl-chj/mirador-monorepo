import {DiscoveryComponent, WorkspaceControlPanel} from '@mirador/custom-components';
import React, {ReactElement} from 'react';
import Workspace from '../../containers/workspace/Workspace';
import classNames from 'classnames';
import {getIsWorkspaceAddVisible} from '@mirador/core'
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

export const WorkspaceArea: React.FC<IWorkspaceArea> = (props): ReactElement => {
  const classes = useStyles({})
  const {t} = useTranslation()
  const isWorkspaceAddVisible = getIsWorkspaceAddVisible()
  const {isWorkspaceControlPanelVisible} = props;

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
              <DiscoveryComponent />
            </>
          )
          : <Workspace />
      }
    </main>
  );
}
