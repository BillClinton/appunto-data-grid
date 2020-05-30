import React from 'react'
import { Text } from '@chakra-ui/core'
import {
  DataGrid,
  GridHeader,
  GridColumnHeader,
  GridRows,
  GridFooter,
  useLocalPager
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
  const { pageNext, pagePrev, pageData, page, pageTotal } = useLocalPager(
    data,
    10
  )

  return (
    <>
      <DataGrid
        columns={columns}
        data={pageData()}
        mx={[0, 4, 6, 8]}
        my={[0, 2, 2, 2]}
        borderRadius={8}
        border='2px'
        borderColor='blue.400'
      >
        <GridHeader bg='blue.400'>
          <Text fontSize='md' fontWeight='medium' color='gray.100' mt={0}>
            Simple data grid with local data
          </Text>
        </GridHeader>
        <GridColumnHeader bg='gray.200' fontWeight='medium' />
        <GridRows selectedBg='yellow.100' stripeBg='gray.50' />
        <GridFooter
          bg='blue.400'
          color='gray.100'
          mb='-1px'
          pageNext={pageNext}
          pagePrev={pagePrev}
          page={page}
          pageTotal={pageTotal}
        />
      </DataGrid>
    </>
  )
}

export default LocalGrid
