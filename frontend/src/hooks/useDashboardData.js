import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

const formatError = (err) => {
  const detail = err?.response?.data?.detail
  if (Array.isArray(detail)) {
    // FastAPI validation errors: pull ut "msg" från varje fel
    return detail.map((d) => d?.msg || JSON.stringify(d)).join('; ')
  }
  if (typeof detail === 'string') return detail
  if (err?.message) return err.message
  return typeof err === 'object' ? JSON.stringify(err) : String(err)
}

export const useDashboardData = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.get('/data')
      setItems(data)
    } catch (err) {
      setError(formatError(err))
    } finally {
      setLoading(false)
    }
  }, [])

  const createItem = useCallback(async (payload) => {
    setSubmitting(true)
    setError(null)
    try {
      const { data } = await api.post('/data', payload)
      setItems((current) => [data, ...current])
    } catch (err) {
      setError(formatError(err))
      throw err
    } finally {
      setSubmitting(false)
    }
  }, [])

  const deleteItem = useCallback(async (id) => {
    setSubmitting(true)
    setError(null)
    try {
      await api.delete(`/data/${id}`)
      setItems((current) => current.filter((item) => item._id !== id))
    } catch (err) {
      setError(formatError(err))
      throw err
    } finally {
      setSubmitting(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 15000)
    return () => clearInterval(interval)
  }, [fetchData])

  const statistics = useMemo(() => {
    if (!items.length) {
      return {
        totalEntries: 0,
        totalValue: 0,
        averageValue: 0,
        categories: {},
      }
    }
    const totalValue = items.reduce((sum, item) => sum + Number(item.value || 0), 0)

    return {
      totalEntries: items.length,
      totalValue,
      averageValue: totalValue / items.length,
    }
  }, [items])

  return {
    items,
    loading,
    error,
    submitting,
    statistics,
    refetch: fetchData,
    createItem,
    deleteItem,
  }
}

