import { useState, useEffect, useCallback } from 'react'
import { mockAlerts } from '../api/mockData'
import { fetchAzureAlerts } from '../api/azureMonitor'

const DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true'

async function fetchAlerts(token) {
  if (DEMO_MODE || !token) {
    const delay = 300 + Math.random() * 500
    await new Promise(resolve => setTimeout(resolve, delay))
    return mockAlerts
  }
  return fetchAzureAlerts(token)
}

export function useAlerts(token, intervalMs = 30000) {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const load = useCallback(async () => {
    try {
      const data = await fetchAlerts(token)
      setAlerts(data)
      setLastUpdated(new Date())
      setError(null)
    } catch (err) {
      setError('Failed to fetch alerts. Retrying...')
      console.error('useAlerts fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const interval = setInterval(() => {
      load()
    }, intervalMs)
    return () => clearInterval(interval)
  }, [load, intervalMs])

  return { alerts, loading, error, lastUpdated, refresh: load }
}