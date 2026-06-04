import { useCallback, useEffect, useState } from 'react'
import type { ListParams, PaginatedResult } from '../types'

type Fetcher<T> = (params: ListParams) => Promise<{ success: boolean; data: PaginatedResult<T> }>

export function usePaginatedList<T>(fetcher: Fetcher<T>, initialPageSize = 10) {
  const [data, setData] = useState<T[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize] = useState(initialPageSize)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [publishedFilter, setPublishedFilter] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params: ListParams = {
        page,
        pageSize,
        search: search || undefined,
        status: statusFilter || undefined,
        published:
          publishedFilter === 'published'
            ? true
            : publishedFilter === 'draft'
              ? false
              : undefined,
      }
      const response = await fetcher(params)
      setData(response.data.data)
      setTotal(response.data.total)
      setTotalPages(response.data.totalPages)
    } catch {
      setError('Failed to load data. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [fetcher, page, pageSize, search, statusFilter, publishedFilter])

  useEffect(() => {
    setPage(1)
  }, [search, statusFilter, publishedFilter])

  useEffect(() => {
    void load()
  }, [load])

  const refresh = useCallback(() => {
    void load()
  }, [load])

  const goToPage = (next: number) => {
    setPage(Math.min(Math.max(1, next), totalPages))
  }

  const resetFilters = () => {
    setSearch('')
    setStatusFilter('')
    setPublishedFilter('')
    setPage(1)
  }

  return {
    data,
    total,
    page,
    pageSize,
    totalPages,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    publishedFilter,
    setPublishedFilter,
    loading,
    error,
    refresh,
    goToPage,
    setPage,
    resetFilters,
  }
}
