import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, IconButton, Text, useTheme } from '@chakra-ui/core'
import usePagination from './usePagination'

const getCurrentBreakpointIndex = (breakpoints) => {
  const baseFontSize = window
    .getComputedStyle(document.documentElement)
    .fontSize.replace(/\D/g, '')
  const emWidth = window.innerWidth / parseInt(baseFontSize)

  const breakpoint = breakpoints.reduce((a, v) =>
    emWidth > parseInt(a.replace(/\D/g, ''), 10) ? v : a
  )

  return breakpoints.indexOf(breakpoint)
}

const getSpan = (col, breakpointIndex) => {
  return Array.isArray(col.span) ? col.span[breakpointIndex] : col.span
}

const getTotalSpan = (columns, breakpointIndex) => {
  return columns.reduce((a, v) => {
    return a + getSpan(v, breakpointIndex)
  }, 0)
}

const DataGrid = ({ columns, data, ...rest }) => {
  const { next, prev, currentData, currentPage, maxPage } = usePagination(
    data,
    10
  )
  const [selectedId, setSelectedId] = useState(null)
  const [breakpointIndex, setBreakpointIndex] = useState(null)
  const theme = useTheme()

  React.useEffect(() => {
    setBreakpointIndex(getCurrentBreakpointIndex(theme.breakpoints))
  }, [window.innerWidth])

  useEffect(() => {
    const handleResize = () => {
      setBreakpointIndex(getCurrentBreakpointIndex(theme.breakpoints))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const frameColor = rest.borderColor
  const totalSpan = getTotalSpan(columns, breakpointIndex)

  const renderHeaderColumn = (start, col) => {
    return (
      <Box
        bg={frameColor}
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

  const getDataColumnBg = (idx, id) => {
    if (id === selectedId) {
      return { bg: 'blue.100' } // selected row
    } else if (idx % 2 === 0) {
      return { bg: 'gray.50' }
    }
    return {}
  }

  const renderDataColumn = (start, col, id, text, idx) => {
    return (
      <Box
        px={2}
        py={1}
        {...getDataColumnBg(idx, id)}
        borderBottom={1}
        borderBottomColor='gray.200'
        minWidth={0}
        gridColumn={`${start === 1 ? '1' : 'auto'} / span ${getSpan(
          col,
          breakpointIndex
        )}`}
        whiteSpace='nowrap'
        overflow='hidden'
        textOverflow='ellipsis'
        key={`${idx}-${start}`}
        onClick={() => setSelectedId(id !== selectedId ? id : null)}
        GridRowStart
      >
        {text}
      </Box>
    )
  }

  const renderFooter = () => {
    return (
      <Flex
        bg={frameColor}
        px={2}
        py={1}
        minWidth={0}
        justifyContent='space-between'
        gridColumn={`1 / span ${totalSpan}`}
        overflow='hidden'
      >
        <IconButton
          aria-label='previous page'
          icon='arrow-left'
          variant='ghost'
          borderRadius={20}
          onClick={() => prev()}
        >
          prev
        </IconButton>
        <Text mt={2} fontSize='sm'>
          page {currentPage} of {maxPage}
        </Text>
        <IconButton
          aria-label='next page'
          icon='arrow-right'
          variant='ghost'
          borderRadius={20}
          onClick={() => next()}
        >
          Next
        </IconButton>
      </Flex>
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

  const renderDataRow = (rec, idx) => {
    let colStart = 1
    return columns.map((col) => {
      if (getSpan(col, breakpointIndex) > 0) {
        const row = renderDataColumn(
          colStart,
          col,
          rec.id,
          rec[col.dataIndex],
          idx
        )
        colStart += col.span
        return row
      }
    })
  }

  const renderRows = (data) => {
    return data.map((rec, idx) => renderDataRow(rec, idx))
  }

  console.log(totalSpan)

  return (
    <Grid
      gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start])`}
      overflow='hidden'
      minHeight={0}
      minWidth={0}
      {...rest}
    >
      {renderHeader()}
      {renderRows(currentData())}
      {renderFooter()}
    </Grid>
  )
}

export default DataGrid
