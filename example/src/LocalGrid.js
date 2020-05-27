import React from 'react'
import { Text } from '@chakra-ui/core'
import {
  GridContextProvider,
  DataGrid,
  GridHeader,
  GridColumnHeader,
  GridRows,
  GridFooter
} from 'appunto-data-grid'
import data from './mock-data.json'

const columns = [
  {
    text: 'First Name',
    dataIndex: 'first_name',
    span: 3
  },
  {
    text: 'Last Name',
    dataIndex: 'last_name',
    span: 3
  },
  {
    text: 'Email',
    dataIndex: 'email',
    span: [0, 4, 4, 4]
  },
  {
    text: 'City',
    dataIndex: 'city',
    span: [0, 0, 2, 2]
  }
]

const LocalGrid = () => {
  return (
    <>
      <Text textAlign='center' fontSize='sm'>
        Simple data grid with local data
      </Text>
      <DataGrid
        columns={columns}
        data={data}
        mx={[0, 4, 6, 8]}
        my={[0, 2, 2, 2]}
        borderRadius={8}
        border='2px'
        borderColor='gray.200'
      >
        <GridHeader bg='gray.200'>Simple data grid with local data</GridHeader>
        <GridColumnHeader bg='gray.200' fontWeight='medium' />
        <GridRows selectedBg='yellow.100' stripeBg='gray.50' />
        <GridFooter bg='gray.200' mb='-1px' />
      </DataGrid>
    </>
  )
}

export default LocalGrid
