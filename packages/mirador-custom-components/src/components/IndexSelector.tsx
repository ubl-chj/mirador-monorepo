import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import React from 'react'

interface IIndexSelector {
  discovery: {
    currentIndex: string,
    indices: {}
  },
  updateConfig: Function
}

const IndexSelector : React.FC<IIndexSelector> = (props) => {
  const getIndexNames = () => {
    const indices = props.discovery.indices
    const map = new Map()
    Object.keys(indices).forEach((key: any) => {
      map.set(key, indices[key].name)
    })
    return new Map([...map.entries()].sort())
  }
  const indexMap = getIndexNames()

  const buildSelectOptions = () => {
    const opts = Array.from(indexMap, ([key, value]) => {
      return <option key={key} value={key}>{value}</option>
    })
    return (
      <>{opts}</>)
  }
  const options = buildSelectOptions()

  const handleChange = (event) => {
    const update = props.updateConfig
    update({
      discovery: {
        currentIndex: event.target.value,
      },
    })
  }

  return (
    <FormControl>
      <InputLabel htmlFor="index-native">Index</InputLabel>
      <Select
        native={Boolean(true)}
        value={props.discovery.currentIndex}
        onChange={handleChange}
        inputProps={{
          id: 'index-native',
          name: 'currentIndex',
        }}
      >
        {options}
      </Select>
    </FormControl>
  )
}

export default IndexSelector
