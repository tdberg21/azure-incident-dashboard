import { getSeverity } from "../../utils/severity";

function SeverityBadge({ severity }) {
  const config = getSeverity(severity);
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
        border: `1px solid ${config.border}`,
      }}
    >
      {config.label}
    </span>
  );
}

export default SeverityBadge;
