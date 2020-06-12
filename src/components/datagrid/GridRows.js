import React, { useContext } from 'react'
import { Box, Flex, Grid, Spinner } from '@chakra-ui/core'
import { GridContext } from './GridContext'
import GridButtonColumn from './GridButtonColumn'

const GridRows = ({ actions, selectedBg, stripeBg, isLoading }) => {
  const {
    columns,
    data,
    breakpointIndex,
    selectedId,
    setSelectedId,
    getSpan,
    totalSpan
  } = useContext(GridContext)

  const getDataColumnBg = (rowIndex, id) => {
    if (id === selectedId && selectedBg) {
      return { bg: selectedBg } // selected row
    } else if (stripeBg && rowIndex % 2 === 0) {
      return { bg: stripeBg }
    }
    return {}
  }

  const renderDataColumn = (start, col, id, text, rowIndex) => {
    return (
      <Box
        px={2}
        py={1}
        {...getDataColumnBg(rowIndex, id)}
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
        key={`${rowIndex}-${start}`}
        onClick={() => setSelectedId(id !== selectedId ? id : null)}
        // GridRowStart
      >
        {text}
      </Box>
    )
  }

  const renderDataRow = (rec, rowIndex) => {
    let colStart = 1
    const row = columns.map((col) => {
      if (getSpan(col, breakpointIndex) > 0) {
        const val = rec[col.dataIndex]
        const display = col.renderer ? col.renderer(val, rec) : val
        const dataColumn = renderDataColumn(
          colStart,
          col,
          rec.id,
          display,
          rowIndex
        )
        colStart += col.span
        return dataColumn
      }
    })

    return row.concat(
      <Box
        key={`${rowIndex}-${colStart}`}
        gridColumn={`${colStart} / span 1`}
        {...getDataColumnBg(rowIndex, rec.id)}
      >
        {actions ? <GridButtonColumn actions={actions} record={rec} /> : null}
      </Box>
    )
  }

  const renderRows = () => {
    if (Array.isArray(data)) {
      return data.map((rec, idx) => renderDataRow(rec, idx))
    }
  }

  return (
    <Flex overflowY='auto' position='relative'>
      {isLoading ? (
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='blue.500'
          color='gray.100'
          size='xl'
          top='48%'
          left='48%'
          position='absolute'
        />
      ) : null}
      <Grid
        gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start]) 28px`}
        width='100%'
        overflow='hidden'
        minWidth={0}
        minHeight='min-content'
      >
        {renderRows()}
      </Grid>
    </Flex>
  )
}

export default GridRows
