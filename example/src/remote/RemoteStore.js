import React, { createContext, useEffect, useState } from 'react'
import ApiMachine from './ApiMachine'
import { useMachine } from '@xstate/react'

export const RemoteStore = createContext()

const RemoteStoreProvider = (props) => {
  const apiMachine = ApiMachine('users')
  const [state, send, service] = useMachine(apiMachine)
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)

  useEffect(() => {
    const subscription = service.subscribe((state) => {
      // simple state logging
      console.log(state.value)
      // console.log(state.context);
    })

    return subscription.unsubscribe
  }, [service]) // note: service should never change

  const create = (data) => send({ type: 'post', data })
  const readCollection = (params) => send({ type: 'getCollection', params })
  const readItem = (id) => send({ type: 'getItem', id })
  const update = (id, data) =>
    send({ type: 'patch', id, data: JSON.stringify(data) })
  const destroy = (id) => send({ type: 'delete', id })

  const refresh = () => {
    readCollection({ page, per_page: perPage })
  }

  const resetDelete = () => {
    send({ to: 'destroy', type: 'reset' })
  }

  useEffect(() => {
    readCollection({ page, per_page: perPage })
  }, [page, perPage])

  const store = {
    collection: state.context.collection.data,
    item: state.context.item,
    message: state.context.message,
    matchState: state.matches,
    send,
    create,
    readCollection,
    readItem,
    update,
    destroy,
    refresh,
    resetDelete
  }

  return (
    <RemoteStore.Provider value={{ store }}>
      {props.children}
    </RemoteStore.Provider>
  )
}

export default RemoteStoreProvider
