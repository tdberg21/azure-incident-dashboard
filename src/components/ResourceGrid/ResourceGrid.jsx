import { useState } from "react";
import { HEALTH_CONFIG } from "../../utils/severity";
import SeverityBadge from "../shared/SeverityBadge";

function HealthDot({ health }) {
  const config = HEALTH_CONFIG[health] ?? HEALTH_CONFIG["Unavailable"];
  return (
    <span
      style={{
        display: "inline-block",
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        background: config.color,
        marginRight: "6px",
      }}
    />
  );
}

function ResourceCard({ resource, alerts }) {
  const [expanded, setExpanded] = useState(false);
  const config = HEALTH_CONFIG[resource.health] ?? HEALTH_CONFIG["Unavailable"];
  const resourceAlerts = alerts.filter(
    (a) => a.resource === resource.name && a.status !== "Resolved",
  );

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        overflow: "hidden",
        transition: "box-shadow 0.15s",
      }}
    >
      {/* Card header */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#f8fafc")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div
            style={{ fontSize: "14px", fontWeight: "600", color: "#0f172a" }}
          >
            {resource.name}
          </div>
          <div style={{ fontSize: "12px", color: "#94a3b8" }}>
            {resource.type} · {resource.resourceGroup}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "6px",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "3px 10px",
              borderRadius: "99px",
              fontSize: "12px",
              fontWeight: "600",
              color: config.color,
              background: config.bg,
            }}
          >
            <HealthDot health={resource.health} />
            {resource.health}
          </span>
          {resourceAlerts.length > 0 && (
            <span style={{ fontSize: "11px", color: "#94a3b8" }}>
              {resourceAlerts.length} active alert
              {resourceAlerts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Expanded alerts */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid #f1f5f9",
            padding: "12px 20px",
            background: "#f8fafc",
          }}
        >
          {resourceAlerts.length === 0 ? (
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0 }}>
              No active alerts on this resource.
            </p>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {resourceAlerts.map((alert) => (
                <div
                  key={alert.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "13px",
                    color: "#0f172a",
                  }}
                >
                  <SeverityBadge severity={alert.severity} />
                  <span>{alert.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResourceGrid({ resources, alerts }) {
  const counts = {
    Available: resources.filter((r) => r.health === "Available").length,
    Degraded: resources.filter((r) => r.health === "Degraded").length,
    Unavailable: resources.filter((r) => r.health === "Unavailable").length,
  };

  return (
    <div>
      {/* Summary row */}
      <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        {Object.entries(counts).map(([status, count]) => {
          const config = HEALTH_CONFIG[status];
          return (
            <div
              key={status}
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                background: config.bg,
                fontSize: "13px",
                fontWeight: "600",
                color: config.color,
              }}
            >
              <HealthDot health={status} />
              {count} {status}
            </div>
          );
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: "16px",
        }}
      >
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} alerts={alerts} />
        ))}
      </div>
    </div>
  );
}

export default ResourceGrid;
