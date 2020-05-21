import React from 'react'
import GridContextProvider from './GridContext'
import GridBody from './GridBody'

const DataGrid = (props) => {
  return (
    <GridContextProvider>
      <GridBody {...props} />
    </GridContextProvider>
  )
}

export default DataGrid
