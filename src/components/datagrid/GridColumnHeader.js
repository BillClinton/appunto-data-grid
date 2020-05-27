import React, { useContext } from 'react'
import { Box, Grid, IconButton } from '@chakra-ui/core'
import { GridContext } from './GridContext'

const GridColumnHeader = (props) => {
  const { columns, breakpointIndex, getSpan, totalSpan } = useContext(
    GridContext
  )
  const renderHeaderColumn = (start, col) => {
    return (
      <Box
        // bg={frameColor}
        px={2}
        // py={2}
        minWidth={0}
        gridColumn={`${start === 1 ? '1' : 'auto'} / span ${getSpan(
          col,
          breakpointIndex
        )}`}
        whiteSpace='nowrap'
        overflow='hidden'
        textOverflow='ellipsis'
        key={`header-col-${start}`}
        {...props}
      >
        {col.text}
        <IconButton
          size='xs'
          variant='ghost'
          aria-label={`sort by ${col.text}`}
          icon='triangle-down'
        />
      </Box>
    )
  }

  const renderHeader = () => {
    const headerCols = []
    let colStart = 1

    columns &&
      columns.forEach((col) => {
        if (getSpan(col, breakpointIndex) > 0) {
          headerCols.push(renderHeaderColumn(colStart, col))
          colStart += col.span
        }
      })

    headerCols.push(<Box {...props}></Box>)

    return headerCols
  }

  return (
    <Grid
      gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start]) 40px`}
      overflow='hidden'
      minWidth={0}
    >
      {renderHeader()}
    </Grid>
  )
}

export default GridColumnHeader
