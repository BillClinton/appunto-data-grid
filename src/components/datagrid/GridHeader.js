import React, { Fragment, useContext } from 'react'
import { Box } from '@chakra-ui/core'
import useChakraBreakpoints from './useChakraBreakpoints'
import { GridContext } from './GridContext'

const GridHeader = ({ columns }) => {
  const { getSpan } = useContext(GridContext)
  const { breakpointIndex } = useChakraBreakpoints()
  console.log(breakpointIndex)

  const renderHeaderColumn = (start, col) => {
    return (
      <Box
        // bg={frameColor}
        px={2}
        py={2}
        minWidth={0}
        gridColumn={`${start === 1 ? '1' : 'auto'} / span ${getSpan(
          col,
          breakpointIndex
        )}`}
        whiteSpace='nowrap'
        overflow='hidden'
        textOverflow='ellipsis'
        key={`header-col-${start}`}
      >
        {col.text}
      </Box>
    )
  }

  const renderHeader = () => {
    const headerCols = []
    let colStart = 1

    columns.forEach((col) => {
      if (getSpan(col, breakpointIndex) > 0) {
        headerCols.push(renderHeaderColumn(colStart, col))
        colStart += col.span
      }
    })

    return headerCols
  }

  return <Fragment>{renderHeader()}</Fragment>
}

export default GridHeader
