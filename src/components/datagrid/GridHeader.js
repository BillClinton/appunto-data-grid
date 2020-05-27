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
      <Box>{children}</Box>
      {actions ? <Box>{actions}</Box> : ''}
      {/* {actions &&
        actions.map((action, idx) => (
          <IconButton
            key={idx}
            variant='ghost'
            aria-label={action.text}
            icon={action.icon}
            onClick={action.onClick}
          />
        ))} */}
    </Flex>
  )
}

export default GridHeader
