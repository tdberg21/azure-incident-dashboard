import { useState, useMemo } from "react";
import { sortBySeverity } from "../../utils/severity";
import AlertRow from "./AlertRow";
import FilterBar from "./FilterBar";

const COLUMNS = [
  "Severity",
  "Alert Name",
  "Resource",
  "Resource Group",
  "Fired",
  "Status",
  "Assigned To",
];

function AlertFeed({ alerts, onAlertClick }) {
  const [filters, setFilters] = useState({
    severity: "All",
    status: "All",
    resourceGroup: "All",
  });

  const resourceGroups = useMemo(() => {
    return [...new Set(alerts.map((a) => a.resourceGroup))].sort();
  }, [alerts]);

  const filtered = useMemo(() => {
    return alerts.filter((alert) => {
      if (filters.severity !== "All" && alert.severity !== filters.severity)
        return false;
      if (filters.status !== "All" && alert.status !== filters.status)
        return false;
      if (
        filters.resourceGroup !== "All" &&
        alert.resourceGroup !== filters.resourceGroup
      )
        return false;
      return true;
    });
  }, [alerts, filters]);

  const sorted = sortBySeverity(filtered);

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0" }}>
        <h2
          style={{
            fontSize: "15px",
            fontWeight: "600",
            color: "#0f172a",
            margin: 0,
          }}
        >
          Active Alerts
          <span
            style={{
              marginLeft: "8px",
              fontSize: "13px",
              fontWeight: "400",
              color: "#64748b",
            }}
          >
            {sorted.length} of {alerts.length} shown
          </span>
        </h2>
      </div>

      <FilterBar
        filters={filters}
        onChange={setFilters}
        resourceGroups={resourceGroups}
      />

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
              }}
            >
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "10px 16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#64748b",
                    whiteSpace: "nowrap",
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    padding: "32px",
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: "14px",
                  }}
                >
                  No alerts match the current filters
                </td>
              </tr>
            ) : (
              sorted.map((alert) => (
                <AlertRow key={alert.id} alert={alert} onClick={onAlertClick} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlertFeed;
