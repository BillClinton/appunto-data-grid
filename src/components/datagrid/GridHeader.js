import React, { useContext } from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/core'
import { GridContext } from './GridContext'

const GridHeader = ({ children, actions, ...rest }) => {
  const { totalSpan } = useContext(GridContext)

  return (
    <Flex
      px={2}
      py={1}
      minWidth={0}
      justifyContent='space-between'
      gridColumn={`1 / span ${totalSpan}`}
      overflow='hidden'
      {...rest}
    >
      <Box> </Box>
      <Box>{children}</Box>
      <Box>
        {actions &&
          actions.map((action, idx) =>
            React.cloneElement(action, { key: idx })
          )}
      </Box>
    </Flex>
  )
}

export default GridHeader
