import React, { useContext } from 'react'
import {
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@chakra-ui/core'
import { GridContext } from './GridContext'

const GridButtonColumn = ({ actions, record }) => {
  const { selectedId, setSelectedId } = useContext(GridContext)
  const [isOpen, setIsOpen] = React.useState(false)
  const firstFieldRef = React.useRef(null)
  const open = () => setIsOpen(true)
  const close = () => setIsOpen(false)

  if (isOpen) {
    setSelectedId(record.id)
  }

  return (
    <Popover
      isOpen={isOpen}
      initialFocusRef={firstFieldRef}
      onOpen={open}
      onClose={close}
      placement='left'
      closeOnBlur={false}
      usePortal
    >
      <PopoverTrigger>
        <IconButton size='sm' icon='drag-handle' variant='ghost' />
      </PopoverTrigger>
      <PopoverContent zIndex={4} p={0}>
        <Flex width='100%' alignContent='stretch'>
          {actions &&
            actions.map((action) => {
              return React.cloneElement(action, {
                onClick: (e) => {
                  action.props.onClick(e, record)
                  close()
                }
              })
            })}
        </Flex>
      </PopoverContent>
    </Popover>
  )
}

export default GridButtonColumn
