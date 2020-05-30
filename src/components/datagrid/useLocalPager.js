/**
 * Modified version of example from "React: Creating a Custom Hook for Pagination"
 * https://dev.to/admantium/react-creating-a-custom-hook-for-pagination-jni
 */
import { useState } from 'react'

const useLocalPager = (data, perPage) => {
  const [page, setPage] = useState(1)
  const pageTotal = Math.ceil(data.length / perPage)

  const pageData = () => {
    const begin = (page - 1) * perPage
    const end = begin + perPage
    return data.slice(begin, end)
  }

  const pageNext = () => setPage(Math.min(page + 1, pageTotal))
  const pagePrev = () => setPage(Math.max(page - 1, 1))

  return { pageNext, pagePrev, pageData, page, pageTotal }
}

export default useLocalPager
