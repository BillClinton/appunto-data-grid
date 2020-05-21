import React, { useContext } from 'react'
import { Flex, Grid, IconButton, Text } from '@chakra-ui/core'
import useChakraBreakpoints from './useChakraBreakpoints'
import usePagination from './usePagination'
import { GridContext } from './GridContext'
import GridHeader from './GridHeader'
import GridRows from './GridRows'

const GridBody = ({ columns, data, ...rest }) => {
  const { next, prev, currentData, currentPage, maxPage } = usePagination(
    data,
    10
  )
  const { getTotalSpan } = useContext(GridContext)
  const { breakpointIndex } = useChakraBreakpoints()

  //const frameColor = rest.borderColor
  const totalSpan = getTotalSpan(columns, breakpointIndex)

  const renderFooter = () => {
    return (
      <Flex
        // bg={frameColor}
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

  console.log(totalSpan)

  return (
    <Grid
      gridTemplateColumns={`repeat(${totalSpan}, 1fr [col-start])`}
      overflow='hidden'
      minHeight={0}
      minWidth={0}
      {...rest}
    >
      <GridHeader columns={columns} />
      <GridRows columns={columns} data={data} />
      {renderFooter()}
    </Grid>
  )
}

export default GridBody
