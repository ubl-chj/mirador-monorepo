import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import React from 'react'

const IndexSelector = (props) => {
  const getIndexNames = () => {
    const indices = props.discovery.indices
    const map = new Map()
    Object.keys(indices).forEach((key: any) => {
      map.set(key, indices[key].name)
    })
    const mapSorted = new Map([...map.entries()].sort())
    return mapSorted
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
