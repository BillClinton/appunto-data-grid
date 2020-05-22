import React, { useContext } from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/core'
import usePagination from './usePagination'
import { GridContext } from './GridContext'

const GridFooter = (props) => {
  const { totalSpan, pageNext, pagePrev, currentPage, maxPage } = useContext(
    GridContext
  )

  return (
    <Flex
      // bg={frameColor}
      px={2}
      py={1}
      minWidth={0}
      justifyContent='space-between'
      gridColumn={`1 / span ${totalSpan}`}
      overflow='hidden'
      {...props}
    >
      <IconButton
        aria-label='previous page'
        icon='arrow-left'
        variant='ghost'
        borderRadius={20}
        onClick={() => pagePrev()}
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
        onClick={() => pageNext()}
      >
        Next
      </IconButton>
    </Flex>
  )
}

export default GridFooter
