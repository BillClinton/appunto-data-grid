import React from 'react'
import { ThemeProvider, CSSReset, Text } from '@chakra-ui/core'
import { DataGrid } from 'appunto-data-grid'
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

export default function App() {
  return (
    <ThemeProvider>
      <CSSReset />
      <div className='App'>
        <Text textAlign='center' fontSize='sm'>
          Simple data grid with local pagination using Chakra UI
        </Text>
        <DataGrid
          // Column definition and data
          columns={columns}
          data={data}
          // Chakra UI props forwarded to <Grid> component
          mx={[0, 4, 6, 8]}
          my={[0, 2, 2, 2]}
          borderRadius={8}
          border='1px'
          borderColor='yellow.400'
        />
      </div>
    </ThemeProvider>
  )
}
