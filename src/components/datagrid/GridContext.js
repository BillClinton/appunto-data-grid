import React, { createContext, useContext, useState } from 'react'

export const GridContext = createContext()

export function useGridContext() {
  const { gridContext } = useContext(GridContext)
  return gridContext
}

const GridContextProvider = (props) => {
  const [selectedId, setSelectedId] = useState(null)

  const getSpan = (col, breakpointIndex) => {
    return Array.isArray(col.span) ? col.span[breakpointIndex] : col.span
  }

  const getTotalSpan = (columns, breakpointIndex) => {
    return columns.reduce((a, v) => {
      return a + getSpan(v, breakpointIndex)
    }, 0)
  }

  const gridContext = { selectedId, setSelectedId, getSpan, getTotalSpan }

  return (
    <GridContext.Provider value={gridContext}>
      {props.children}
    </GridContext.Provider>
  )
}

export default GridContextProvider
