import { useCallback, useEffect, useMemo, useState } from 'react'
import { api } from '../services/api'

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
      setError(err.message)
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
      setError(err.message)
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
      setError(err.message)
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

