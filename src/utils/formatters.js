// src/utils/formatters.js

// Format an ISO timestamp to readable date + time
// "2026-08-04T06:12:00Z" → "Aug 4, 2026 6:12 AM"
export function formatDateTime(isoString) {
  if (!isoString) return "—"
  return new Date(isoString).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
}

// Format just the time portion
// "2026-08-04T06:12:00Z" → "6:12 AM"
export function formatTime(isoString) {
  if (!isoString) return "—"
  return new Date(isoString).toLocaleString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  })
}

// Calculate duration between two ISO timestamps
// Returns a human-readable string: "1h 23m" or "45m" or "—"
export function formatDuration(startIso, endIso) {
  if (!startIso || !endIso) return "—"
  const diffMs = new Date(endIso) - new Date(startIso)
  if (diffMs < 0) return "—"

  const totalMinutes = Math.floor(diffMs / 1000 / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

// Calculate time since a timestamp until now
// "alert fired 2 hours ago" type display
export function formatTimeAgo(isoString) {
  if (!isoString) return "—"
  const diffMs = Date.now() - new Date(isoString)
  const totalMinutes = Math.floor(diffMs / 1000 / 60)

  if (totalMinutes < 1) return "just now"
  if (totalMinutes < 60) return `${totalMinutes}m ago`

  const hours = Math.floor(totalMinutes / 60)
  if (hours < 24) return `${hours}h ago`

  const days = Math.floor(hours / 24)
  return `${days}d ago`
}

// Calculate MTTR (Mean Time to Resolve) from an array of alerts
// Returns a formatted string like "1h 12m" or "—" if no resolved alerts
export function calculateMTTR(alerts) {
  const resolved = alerts.filter(a => a.resolvedAt && a.firedAt)
  if (resolved.length === 0) return "—"

  const totalMs = resolved.reduce((sum, alert) => {
    return sum + (new Date(alert.resolvedAt) - new Date(alert.firedAt))
  }, 0)

  const avgMs = totalMs / resolved.length
  const avgMinutes = Math.floor(avgMs / 1000 / 60)
  const hours = Math.floor(avgMinutes / 60)
  const minutes = avgMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

// Calculate MTTA (Mean Time to Acknowledge) from an array of alerts
export function calculateMTTA(alerts) {
  const acknowledged = alerts.filter(a => a.acknowledgedAt && a.firedAt)
  if (acknowledged.length === 0) return "—"

  const totalMs = acknowledged.reduce((sum, alert) => {
    return sum + (new Date(alert.acknowledgedAt) - new Date(alert.firedAt))
  }, 0)

  const avgMs = totalMs / acknowledged.length
  const avgMinutes = Math.floor(avgMs / 1000 / 60)
  const hours = Math.floor(avgMinutes / 60)
  const minutes = avgMinutes % 60

  if (hours === 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}

// Calculate SLA compliance %
// Definition: alerts acknowledged within 15 minutes of firing
export function calculateSLACompliance(alerts) {
  const relevant = alerts.filter(a => a.acknowledgedAt && a.firedAt)
  if (relevant.length === 0) return "—"

  const SLA_THRESHOLD_MS = 15 * 60 * 1000 // 15 minutes

  const compliant = relevant.filter(alert => {
    const diffMs = new Date(alert.acknowledgedAt) - new Date(alert.firedAt)
    return diffMs <= SLA_THRESHOLD_MS
  })

  const pct = Math.round((compliant.length / relevant.length) * 100)
  return `${pct}%`
}