import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { WorkspaceExport } from '../components/ui/WorkspaceExport'

interface IWorkspaceExportProps {
  handleClose: any,
  open?: boolean;
}

/**
 *
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state, ownProps: IWorkspaceExportProps) => ({state, ownProps})

const enhance = compose(
  connect(mapStateToProps, {}),
  withTranslation(),
)

export default enhance(WorkspaceExport)
