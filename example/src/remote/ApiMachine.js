import { Machine, assign } from 'xstate'
import axios from 'axios'

const ApiMachine = (entity) => {
  const API = axios.create({
    baseURL: 'https://reqres.in',
    headers: {
      common: {
        Accept: 'application/json'
      },
      patch: {
        'Content-Type': 'application/merge-patch+json'
      }
    }
  })
  const apiPath = '/api'
  const apiUrl = `${apiPath}/${entity}`

  const apiGetCollection = (ctx, e) => {
    console.log(e.params)
    const urlParams = new URLSearchParams(e.params)

    console.log(urlParams.toString())

    return API.get(`${apiUrl}${urlParams ? '?' + urlParams.toString() : ''}`)
  }
  const apiGetItem = (ctx, e) => API.get(`${apiUrl}/${e.id}`)
  const apiPost = (ctx, e) => API.post(apiUrl, e.data)
  const apiPatch = (ctx, e) => API.patch(`${apiUrl}/${e.id}`, e.data)
  const apiDelete = (ctx, e) => API.delete(`${apiUrl}/${e.id}`)

  return Machine(
    {
      id: `api-${entity}`,
      type: 'parallel',
      context: {
        collection: [],
        meta: {},
        item: null,
        message: null
      },
      states: {
        collection: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                getCollection: 'pending'
              }
            },
            pending: {
              invoke: {
                id: 'getCollection',
                src: apiGetCollection,
                onDone: {
                  target: 'success',
                  actions: ['setGetCollectionResult']
                },
                onError: {
                  target: 'failure',
                  actions: ['setMessage']
                }
              }
            },
            failure: {
              on: {
                getCollection: 'pending',
                reset: {
                  target: 'idle',
                  actions: ['clearMessage']
                }
              }
            },
            success: {
              on: {
                getCollection: 'pending'
              }
            }
          }
        },
        item: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                getItem: 'pending'
              }
            },
            pending: {
              invoke: {
                id: 'getItem',
                src: apiGetItem,
                onDone: {
                  target: 'success',
                  actions: ['setGetItemResult']
                },
                onError: {
                  target: 'failure',
                  actions: ['setMessage']
                }
              }
            },
            failure: {
              on: {
                getItem: 'pending',
                reset: {
                  target: 'idle',
                  actions: ['clearMessage']
                }
              }
            },
            success: {
              on: {
                getItem: 'pending'
              }
            }
          }
        },
        create: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                post: 'pending'
              }
            },
            pending: {
              invoke: {
                id: 'post',
                src: apiPost,
                onDone: {
                  target: 'success',
                  actions: ['onPostSuccess', 'onPostComplete']
                },
                onError: {
                  target: 'failure',
                  actions: ['setMessage']
                }
              }
            },
            failure: {
              on: {
                post: 'pending',
                reset: {
                  target: 'idle',
                  actions: ['clearMessage']
                }
              }
            },
            success: {
              on: {
                post: 'pending'
              }
            }
          }
        },
        update: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                patch: 'pending'
              }
            },
            pending: {
              invoke: {
                id: 'patch',
                src: apiPatch,
                onDone: {
                  target: 'success',
                  actions: ['onPatchSuccess', 'onPatchComplete']
                },
                onError: {
                  target: 'failure',
                  actions: ['setMessage']
                }
              }
            },
            failure: {
              on: {
                patch: 'pending',
                reset: {
                  target: 'idle',
                  actions: ['clearMessage']
                }
              }
            },
            success: {
              on: {
                patch: 'pending'
              }
            }
          }
        },
        destroy: {
          initial: 'idle',
          states: {
            idle: {
              on: {
                delete: 'pending'
              }
            },
            pending: {
              invoke: {
                id: 'delete',
                src: apiDelete,
                onDone: {
                  target: 'success',
                  actions: ['onDeleteSuccess', 'onDeleteComplete']
                },
                onError: {
                  target: 'failure',
                  actions: ['setMessage']
                }
              }
            },
            failure: {
              on: {
                delete: 'pending',
                reset: {
                  target: 'idle',
                  actions: ['clearMessage']
                }
              }
            },
            success: {
              on: {
                delete: 'pending'
              }
            }
          }
        }
      }
    },
    {
      actions: {
        setGetCollectionResult: assign((ctx, event) => {
          console.log(event.data)
          const { data, ...rest } = event.data.data
          return { collection: data, meta: { ...rest } }
        }),
        setGetItemResult: assign((ctx, event) => {
          return { item: event.data.data }
        }),
        onPostSuccess: assign((ctx, event) => {
          ctx.collection.push(event.data.data)
          return { collection: ctx.collection }
        }),
        onPatchSuccess: assign((ctx, event) => {
          const patched = event.data.data
          const collection = ctx.collection.map((item) =>
            item.id === patched.id ? patched : item
          )
          return { collection }
        }),
        onDeleteSuccess: assign((ctx, event) => {
          const url = event.data.config.url
          const id = parseInt(url.substring(url.lastIndexOf('/') + 1), 10)
          const collection = ctx.collection.filter((item) => item.id !== id)
          return { collection }
        }),
        setMessage: assign((ctx, event) => ({
          message: event.data.message
        })),
        clearMessage: assign((ctx, event) => ({
          message: 'null'
        })),
        // dummy actions that can be implemented by store
        onPostComplete: () => {},
        onPatchComplete: () => {},
        onDeleteComplete: () => {}
      }
    }
  )
}

/*
 * Uncomment this line if you want to paste this machine definition into
 * the XState Visualizer at https://xstate.js.org/viz/
 */
// const DemoMachine = ApiMachine('demo');

export default ApiMachine
