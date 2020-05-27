import React, { useContext, useEffect } from 'react'
import { Flex } from '@chakra-ui/core'
import { GridContext } from './GridContext'

const DataGrid = ({ columns, data, children, ...rest }) => {
  const { setColumns, setData } = useContext(GridContext)

  useEffect(() => {
    setColumns(columns)
    setData(data)
  }, [columns, data])

  return (
    <Flex direction='column' {...rest}>
      {children}
    </Flex>
  )
}

export default DataGrid
