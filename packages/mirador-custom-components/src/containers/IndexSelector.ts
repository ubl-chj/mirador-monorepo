import {updateConfig} from '@mirador/core'
import {connect} from 'react-redux'
import IndexSelector from '../components/IndexSelector'

const mapStateToProps = (state) => (
  {
    discovery: state.config.discovery,
  }
)

const mapDispatchToProps = { updateConfig }

export const IndexSelectorContainer = connect(mapStateToProps, mapDispatchToProps)(IndexSelector)
