import { useCallback, useState } from 'react'

export const useBoolean = (initial): any => {
  const [value, setValue] = useState(initial)
  return {
    setFalse: useCallback(() => setValue(false), []),
    setTrue: useCallback(() => setValue(true), []),
    setValue,
    toggle: useCallback(() => setValue((v) => !v), []),
    value,
  }
}
