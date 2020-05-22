import React, { Fragment, useContext } from 'react'
import { Box } from '@chakra-ui/core'
import { GridContext } from './GridContext'

const GridRows = () => {
  const {
    columns,
    data,
    breakpointIndex,
    selectedId,
    setSelectedId,
    getSpan
  } = useContext(GridContext)

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

  const renderRows = () => {
    return data.map((rec, idx) => renderDataRow(rec, idx))
  }

  return <Fragment>{renderRows()}</Fragment>
}

export default GridRows
