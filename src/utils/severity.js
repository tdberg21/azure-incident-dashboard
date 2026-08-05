// src/utils/severity.js

export const SEVERITY_CONFIG = {
  Sev0: {
    label: "Sev 0",
    color: "#ef4444", // red
    bg: "#fef2f2",
    border: "#fecaca",
    priority: 0,
  },
  Sev1: {
    label: "Sev 1",
    color: "#f97316", // orange
    bg: "#fff7ed",
    border: "#fed7aa",
    priority: 1,
  },
  Sev2: {
    label: "Sev 2",
    color: "#eab308", // yellow
    bg: "#fefce8",
    border: "#fef08a",
    priority: 2,
  },
  Sev3: {
    label: "Sev 3",
    color: "#3b82f6", // blue
    bg: "#eff6ff",
    border: "#bfdbfe",
    priority: 3,
  },
  Sev4: {
    label: "Sev 4",
    color: "#6b7280", // gray
    bg: "#f9fafb",
    border: "#e5e7eb",
    priority: 4,
  },
};

export const STATUS_CONFIG = {
  New: {
    label: "New",
    color: "#ef4444",
    bg: "#fef2f2",
  },
  Acknowledged: {
    label: "Acknowledged",
    color: "#f97316",
    bg: "#fff7ed",
  },
  Resolved: {
    label: "Resolved",
    color: "#22c55e",
    bg: "#f0fdf4",
  },
};

export const HEALTH_CONFIG = {
  Available: {
    label: "Available",
    color: "#22c55e",
    bg: "#f0fdf4",
  },
  Degraded: {
    label: "Degraded",
    color: "#f97316",
    bg: "#fff7ed",
  },
  Unavailable: {
    label: "Unavailable",
    color: "#ef4444",
    bg: "#fef2f2",
  },
};

// Helper — get severity config for a given alert
export function getSeverity(severityKey) {
  return SEVERITY_CONFIG[severityKey] ?? SEVERITY_CONFIG["Sev4"];
}

// Helper — sort alerts by severity (Sev0 first)
export function sortBySeverity(alerts) {
  return [...alerts].sort((a, b) => {
    const aPriority = SEVERITY_CONFIG[a.severity]?.priority ?? 99;
    const bPriority = SEVERITY_CONFIG[b.severity]?.priority ?? 99;
    return aPriority - bPriority;
  });
}
