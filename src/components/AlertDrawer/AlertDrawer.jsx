// src/components/AlertDrawer/AlertDrawer.jsx
import SeverityBadge from "../shared/SeverityBadge";
import StatusBadge from "../shared/StatusBadge";
import { formatDateTime, formatDuration } from "../../utils/formatters";

function DrawerRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2px",
        marginBottom: "16px",
      }}
    >
      <span
        style={{
          fontSize: "11px",
          fontWeight: "600",
          color: "#94a3b8",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: "14px", color: "#0f172a" }}>{value ?? "—"}</span>
    </div>
  );
}

function ActionButton({ label, color, bg, border, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 16px",
        fontSize: "13px",
        fontWeight: "600",
        color,
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function AlertDrawer({ alert, onClose }) {
  if (!alert) return null;

  const ackDuration = formatDuration(alert.firedAt, alert.acknowledgedAt);
  const resolveDuration = formatDuration(alert.firedAt, alert.resolvedAt);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.2)",
          zIndex: 40,
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "420px",
          background: "#ffffff",
          borderLeft: "1px solid #e2e8f0",
          zIndex: 50,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: "12px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <SeverityBadge severity={alert.severity} />
              <StatusBadge status={alert.status} />
            </div>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#0f172a",
                margin: 0,
                lineHeight: "1.4",
              }}
            >
              {alert.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
              color: "#94a3b8",
              lineHeight: 1,
              padding: "2px",
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "24px", flex: 1 }}>
          {/* Alert details */}
          <DrawerRow label="Alert Rule" value={alert.alertRule} />
          <DrawerRow label="Resource" value={alert.resource} />
          <DrawerRow label="Resource Group" value={alert.resourceGroup} />
          <DrawerRow label="Assigned To" value={alert.assignedTo} />

          <div
            style={{ borderTop: "1px solid #f1f5f9", margin: "8px 0 20px" }}
          />

          {/* Timeline */}
          <DrawerRow label="Fired At" value={formatDateTime(alert.firedAt)} />
          <DrawerRow
            label="Acknowledged At"
            value={
              alert.acknowledgedAt
                ? `${formatDateTime(alert.acknowledgedAt)} (${ackDuration} after firing)`
                : "—"
            }
          />
          <DrawerRow
            label="Resolved At"
            value={
              alert.resolvedAt
                ? `${formatDateTime(alert.resolvedAt)} (${resolveDuration} after firing)`
                : "—"
            }
          />

          <div
            style={{ borderTop: "1px solid #f1f5f9", margin: "8px 0 20px" }}
          />

          {/* Action buttons */}
          {alert.status === "New" && (
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              <ActionButton
                label="Acknowledge"
                color="#f97316"
                bg="#fff7ed"
                border="#fed7aa"
                onClick={() =>
                  alert("Acknowledge action — wire to Azure API in Session 10")
                }
              />
            </div>
          )}

          {alert.status === "Acknowledged" && (
            <div style={{ display: "flex", gap: "8px", marginBottom: "24px" }}>
              <ActionButton
                label="Resolve"
                color="#22c55e"
                bg="#f0fdf4"
                border="#bbf7d0"
                onClick={() =>
                  alert("Resolve action — wire to Azure API in Session 10")
                }
              />
            </div>
          )}

          {/* Notes field */}
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label
              style={{
                fontSize: "11px",
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Notes
            </label>
            <textarea
              placeholder="Add investigation notes..."
              rows={4}
              style={{
                padding: "10px 12px",
                fontSize: "13px",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                resize: "vertical",
                fontFamily: "system-ui, sans-serif",
                color: "#0f172a",
                outline: "none",
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AlertDrawer;
