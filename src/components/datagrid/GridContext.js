import React, { createContext, useContext, useState } from 'react'
import { Grid } from '@chakra-ui/core'
import useChakraBreakpoints from './useChakraBreakpoints'
import usePagination from './usePagination'

export const GridContext = createContext()

export function useGridContext() {
  const { gridContext } = useContext(GridContext)
  return gridContext
}

const GridContextProvider = ({
  columns: columnConfig,
  data: gridData,
  children,
  ...rest
}) => {
  const [selectedId, setSelectedId] = useState(null)
  const [columns] = useState(columnConfig)
  const [data, setData] = useState(gridData)
  const { breakpointIndex } = useChakraBreakpoints()
  const { next, prev, currentData, currentPage, maxPage } = usePagination(
    data,
    10
  )

  const getSpan = (col, breakpointIndex) => {
    return Array.isArray(col.span) ? col.span[breakpointIndex] : col.span
  }

  const getTotalSpan = (columns, breakpointIndex) => {
    return columns.reduce((a, v) => {
      return a + getSpan(v, breakpointIndex)
    }, 0)
  }

  const totalSpan = columns.reduce((a, v) => {
    return a + getSpan(v, breakpointIndex)
  }, 0)

  const gridContext = {
    columns,
    data: currentData(),
    setData,
    breakpointIndex,
    selectedId,
    setSelectedId,
    getSpan,
    totalSpan,
    pageNext: next,
    pagePrev: prev,
    currentPage,
    maxPage
  }

  return (
    <GridContext.Provider value={gridContext}>
      <Grid
        gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start])`}
        overflow='hidden'
        minHeight={0}
        minWidth={0}
        {...rest}
      >
        {children}
      </Grid>
    </GridContext.Provider>
  )
}

export default GridContextProvider
