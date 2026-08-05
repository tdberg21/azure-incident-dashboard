// src/components/shared/StatusBadge.jsx
import { STATUS_CONFIG } from "../../utils/severity";

function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG["New"];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "12px",
        fontWeight: "600",
        color: config.color,
        background: config.bg,
      }}
    >
      {config.label}
    </span>
  );
}

export default StatusBadge;
