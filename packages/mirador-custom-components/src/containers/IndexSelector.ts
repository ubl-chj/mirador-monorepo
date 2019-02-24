import {updateConfig} from '@mirador/core'
import {connect} from 'react-redux'
import IndexSelector from '../components/IndexSelector'

const mapStateToProps = (state) => (
  {
    discovery: state.config.discovery,
  }
)

const mapDispatchToProps = { updateConfig }

export default connect(mapStateToProps, mapDispatchToProps)(IndexSelector)
