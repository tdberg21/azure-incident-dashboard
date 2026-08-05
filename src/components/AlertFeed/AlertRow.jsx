// src/components/AlertFeed/AlertRow.jsx
import SeverityBadge from "../shared/SeverityBadge";
import StatusBadge from "../shared/StatusBadge";
import { formatTimeAgo } from "../../utils/formatters";

function AlertRow({ alert, onClick }) {
  return (
    <tr
      onClick={() => onClick(alert)}
      style={{
        borderBottom: "1px solid #f1f5f9",
        cursor: "pointer",
        transition: "background 0.1s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      <td style={td}>
        <SeverityBadge severity={alert.severity} />
      </td>
      <td style={td}>{alert.name}</td>
      <td style={{ ...td, color: "#64748b", fontSize: "13px" }}>
        {alert.resource}
      </td>
      <td style={{ ...td, color: "#64748b", fontSize: "13px" }}>
        {alert.resourceGroup}
      </td>
      <td style={{ ...td, color: "#64748b", fontSize: "13px" }}>
        {formatTimeAgo(alert.firedAt)}
      </td>
      <td style={td}>
        <StatusBadge status={alert.status} />
      </td>
      <td style={{ ...td, color: "#64748b", fontSize: "13px" }}>
        {alert.assignedTo ?? "—"}
      </td>
    </tr>
  );
}

const td = {
  padding: "12px 16px",
  verticalAlign: "middle",
};

export default AlertRow;
