import { useState, useEffect, useCallback } from "react";
import { mockAlerts } from "../api/mockData";

// Simulates a fetch from the Azure Monitor API
// In demo mode, returns mock data with a fake network delay
// In Session 10, replace fetchAlerts with a real API call
async function fetchAlerts() {
  // Simulate network latency (300–800ms)
  const delay = 300 + Math.random() * 500;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // In demo mode — return mock data
  // Swap this for a real Azure Monitor API call in Session 10
  return mockAlerts;
}

export function useAlerts(intervalMs = 30000) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const load = useCallback(async () => {
    try {
      const data = await fetchAlerts();
      setAlerts(data);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError("Failed to fetch alerts. Retrying...");
      console.error("useAlerts fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    load();
  }, [load]);

  // Polling interval
  useEffect(() => {
    const interval = setInterval(() => {
      load();
    }, intervalMs);

    return () => clearInterval(interval);
  }, [load, intervalMs]);

  return { alerts, loading, error, lastUpdated, refresh: load };
}
