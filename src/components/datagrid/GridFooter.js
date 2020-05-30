import React, { useContext } from 'react'
import { Flex, IconButton, Text } from '@chakra-ui/core'
import { GridContext } from './GridContext'

const GridFooter = ({ page, pageTotal, pagePrev, pageNext, ...rest }) => {
  const { totalSpan } = useContext(GridContext)

  return (
    <Flex
      // bg={frameColor}
      px={2}
      py={1}
      minWidth={0}
      justifyContent='space-between'
      gridColumn={`1 / span ${totalSpan}`}
      overflow='hidden'
      {...rest}
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
        page {page} of {pageTotal}
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
