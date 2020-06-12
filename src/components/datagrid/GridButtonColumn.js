import React, { useContext } from 'react'
import { Box, Flex, IconButton } from '@chakra-ui/core'
import { GridContext } from './GridContext'

const GridButtonColumn = ({ actions, record }) => {
  const { setSelectedId } = useContext(GridContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const close = () => setIsOpen(false)
  const toggle = () => setIsOpen(!isOpen)

  if (isOpen) {
    setSelectedId(record.id)
  }

  const drawerWidth = actions.length * 40

  const renderActions = () => {
    return (
      <Flex width='100%' alignContent='stretch'>
        {actions &&
          actions.map((action, idx) => {
            return React.cloneElement(action, {
              key: idx,
              onClick: (e) => {
                action.props.onClick(e, record)
                close()
              }
            })
          })}
      </Flex>
    )
  }

  return (
    <Box position='relative'>
      {isOpen ? (
        <Box
          position='absolute'
          top='-4px'
          transition='left 400ms, width 1000ms'
          transformOrigin={`${drawerWidth}px center`}
          overflow='hidden'
          whiteSpace='nowrap'
          left={`-${drawerWidth}px`}
          width={`-${drawerWidth}px`}
        >
          {renderActions()}
        </Box>
      ) : (
        <Box
          position='absolute'
          top='-4px'
          transition='left 400ms, width 1000ms'
          transformOrigin={`${drawerWidth}px center`}
          overflow='hidden'
          whiteSpace='nowrap'
          left='40px'
          width='0px'
        >
          {renderActions()}
        </Box>
      )}
      <IconButton
        size='sm'
        icon='drag-handle'
        variant='ghost'
        onClick={toggle}
      />
    </Box>
  )
}

export default GridButtonColumn
