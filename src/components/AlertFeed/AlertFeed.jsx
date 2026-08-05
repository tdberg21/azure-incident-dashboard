// src/components/AlertFeed/AlertFeed.jsx
import { sortBySeverity } from "../../utils/severity";
import AlertRow from "./AlertRow";

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
  const sorted = sortBySeverity(alerts);

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
            {sorted.length} total
          </span>
        </h2>
      </div>

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
            {sorted.map((alert) => (
              <AlertRow key={alert.id} alert={alert} onClick={onAlertClick} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AlertFeed;
