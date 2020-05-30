import React, { createContext, useContext, useState } from 'react'
import useChakraBreakpoints from './useChakraBreakpoints'

export const GridContext = createContext()

export function useGridContext() {
  const { gridContext } = useContext(GridContext)
  return gridContext
}

const GridContextProvider = ({ columns: colCfg, data: gridData, children }) => {
  const [selectedId, setSelectedId] = useState(null)
  const [columns, setColumns] = useState(colCfg)
  const [data, setData] = useState(gridData)
  const { breakpointIndex } = useChakraBreakpoints()

  const getSpan = (col, breakpointIndex) => {
    return Array.isArray(col.span) ? col.span[breakpointIndex] : col.span
  }

  const totalSpan =
    columns &&
    columns.reduce((a, v) => {
      return a + getSpan(v, breakpointIndex)
    }, 0)

  const gridContext = {
    columns,
    setColumns,
    data,
    setData,
    breakpointIndex,
    selectedId,
    setSelectedId,
    getSpan,
    totalSpan
  }

  return (
    <GridContext.Provider value={gridContext}>{children}</GridContext.Provider>
  )
}

export default GridContextProvider
