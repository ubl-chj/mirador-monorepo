import { withNamespaces } from 'react-i18next'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { WorkspaceExport } from '../components/ui/WorkspaceExport'

interface IownProps {
  handleClose: any,
  open?: boolean;
}

/**
 *
 * @param state
 * @param ownProps
 */
const mapStateToProps = (state, ownProps: IownProps) => ({state, ownProps})

const enhance = compose(
  connect(mapStateToProps, {}),
  withNamespaces(),
)

export default enhance(WorkspaceExport)
