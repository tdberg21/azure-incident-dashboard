const BASE = "https://management.azure.com";
const SUB = import.meta.env.VITE_AZURE_SUBSCRIPTION_ID;

export async function fetchAzureAlerts(token) {
  const url =
    `${BASE}/subscriptions/${SUB}/providers/Microsoft.AlertsManagement/alerts` +
    `?api-version=2019-03-01&alertState=New,Acknowledged`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`Azure API error: ${res.status}`);

  const data = await res.json();

  // Normalize Azure response shape to match our mock data shape
  return data.value.map((alert) => ({
    id: alert.id,
    name: alert.properties?.essentials?.alertRule ?? "Unknown alert",
    severity: alert.properties?.essentials?.severity ?? "Sev4",
    resource: alert.properties?.essentials?.targetResourceName ?? "—",
    resourceGroup: alert.properties?.essentials?.targetResourceGroup ?? "—",
    firedAt: alert.properties?.essentials?.startDateTime ?? null,
    acknowledgedAt: alert.properties?.essentials?.acknowledgedDateTime ?? null,
    resolvedAt: alert.properties?.essentials?.resolvedDateTime ?? null,
    status: alert.properties?.essentials?.alertState ?? "New",
    assignedTo: null,
    alertRule: alert.properties?.essentials?.alertRule ?? "—",
  }));
}

export async function acknowledgeAlert(token, alertId) {
  const url =
    `${BASE}${alertId}/changestate` +
    `?api-version=2019-03-01&newState=Acknowledged`;

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`Acknowledge failed: ${res.status}`);
  return res.json();
}

export async function resolveAlert(token, alertId) {
  const url =
    `${BASE}${alertId}/changestate` + `?api-version=2019-03-01&newState=Closed`;

  const res = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error(`Resolve failed: ${res.status}`);
  return res.json();
}
