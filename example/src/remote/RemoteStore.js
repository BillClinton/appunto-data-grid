import React, { createContext, useEffect, useState } from 'react'
import ApiMachine from './ApiMachine'
import { useMachine } from '@xstate/react'

export const RemoteStore = createContext()

const RemoteStoreProvider = (props) => {
  const apiMachine = ApiMachine('users')
  const [state, send] = useMachine(apiMachine)
  const [page, setPage] = useState(1)
  const [perPage] = useState(10)
  const [pageTotal, setPageTotal] = useState(10)
  const pagePrev = () => setPage(Math.max(page - 1, 1))
  const pageNext = () => setPage(Math.min(page + 1, pageTotal))

  useEffect(() => {
    if (state.context.meta.total_pages) {
      setPageTotal(state.context.meta.total_pages)
    }
  }, [state.context.meta])

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
    collection: state.context.collection,
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
    resetDelete,
    page,
    perPage,
    pageTotal,
    pagePrev,
    pageNext
  }

  return (
    <RemoteStore.Provider value={{ store }}>
      {props.children}
    </RemoteStore.Provider>
  )
}

export default RemoteStoreProvider
