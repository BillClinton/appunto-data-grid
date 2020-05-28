import React, { useContext, useEffect, useState } from 'react'
import { Flex, IconButton, Text, useToast } from '@chakra-ui/core'
import {
  GridContext,
  GridContextProvider,
  DataGrid,
  GridHeader,
  GridColumnHeader,
  GridRows,
  GridFooter
} from 'appunto-data-grid'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import { RemoteStore } from './RemoteStore'

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

const RemoteGrid = () => {
  const { selectedId } = useContext(GridContext)
  const { store } = useContext(RemoteStore)
  const toast = useToast()
  const [condemnedRecord, setCondemnedRecord] = useState(null)
  const data = store.collection

  const deleteRecord = () => {
    store.destroy(condemnedRecord.id)
    setCondemnedRecord(null)
  }

  const headerActions = [
    <IconButton
      aria-label='Refresh data'
      variant='ghost'
      icon='repeat'
      onClick={store.refresh}
    />
  ]

  const rowActions = [
    <IconButton
      aria-label='Edit this record'
      variant='solid'
      variantColor='blue'
      icon='edit'
      onClick={store.refresh}
    />,
    <IconButton
      aria-label='Delete this record'
      variant='solid'
      variantColor='red'
      icon='delete'
      onClick={(e, rec) => setCondemnedRecord(rec)}
    />
  ]

  useEffect(() => {
    if (store.failure) {
      let title = 'An error occurred.'
      if (store.matchState('collection.failure')) {
        title = 'Error attempting to load authors.'
        store.send({ to: 'collection', type: 'reset' })
      }
      if (store.matchState('destroy.failure')) {
        title = 'Error attempting to delete author.'
        store.send({ to: 'destroy', type: 'reset' })
      }

      toast({
        title,
        description: store.message,
        status: 'warning',
        duration: 4000,
        isClosable: true
      })
    }
  }, [store.failure, store, toast])

  return (
    <>
      <Text textAlign='center' fontSize='sm'>
        Data grid with Remote data source and remote pagination
      </Text>
      <>
        {condemnedRecord && (
          <ConfirmDeleteModal
            title='Remove person'
            deleteCondemned={deleteRecord}
            clearCondemned={() => setCondemnedRecord(null)}
          >
            Are you sure you wish to remove <i>{condemnedRecord.name}</i>
          </ConfirmDeleteModal>
        )}
        <DataGrid
          columns={columns}
          data={data}
          mx={[0, 4, 6, 8]}
          my={[0, 2, 2, 2]}
          borderRadius={8}
          border='2px'
          borderColor='gray.200'
        >
          <GridHeader bg='gray.200' actions={headerActions}>
            <Text fontSize='lg' fontWeight='medium' color='gray.600' mt={1}>
              Data grid with Remote data source and remote pagination
            </Text>
          </GridHeader>
          <GridColumnHeader bg='gray.100' fontWeight='medium' />
          <GridRows
            selectedBg='yellow.100'
            stripeBg='gray.50'
            actions={rowActions}
            isLoading={store.matchState('collection.pending')}
          />
          <GridFooter bg='gray.200' mb='-1px' />
        </DataGrid>
      </>
    </>
  )
}

export default RemoteGrid
