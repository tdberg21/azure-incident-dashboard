import { useState } from "react";
import { mockTimelineData, mockResources } from "./api/mockData";
import {
  calculateMTTR,
  calculateMTTA,
  calculateSLACompliance,
} from "./utils/formatters";
import { useAuth } from "./hooks/useAuth";
import { useAlerts } from "./hooks/useAlerts";
import MetricCards from "./components/MetricCards/MetricCards";
import AlertFeed from "./components/AlertFeed/AlertFeed";
import AlertDrawer from "./components/AlertDrawer/AlertDrawer";
import ResolutionChart from "./components/Charts/ResolutionChart";
import ResourceGrid from "./components/ResourceGrid/ResourceGrid";
import MetricsExplorer from "./components/MetricsExplorer/MetricsExplorer";
import LoadingSpinner from "./components/shared/LoadingSpinner";

const TABS = ["Dashboard", "Resource Health", "Metrics Explorer"];
const DEMO_MODE = true;

function App() {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const { account, token, loading: authLoading, login, logout } = useAuth();
  const { alerts, loading, error, lastUpdated, refresh } = useAlerts(
    token,
    30000,
  );

  const metrics = {
    activeCount: alerts.filter((a) => a.status !== "Resolved").length,
    mtta: calculateMTTA(alerts),
    mttr: calculateMTTR(alerts),
    sla: calculateSLACompliance(alerts),
  };

  // Show login screen if not in demo mode and not authenticated
  if (!DEMO_MODE && !authLoading && !account) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "#f8fafc",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "48px",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <div style={{ fontSize: "32px", marginBottom: "16px" }}>☁️</div>
          <h1
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: "#0f172a",
              marginBottom: "8px",
            }}
          >
            Azure Incident Dashboard
          </h1>
          <p
            style={{ fontSize: "14px", color: "#64748b", marginBottom: "32px" }}
          >
            Sign in with your Azure account to view live incident data.
          </p>
          <button
            onClick={login}
            style={{
              padding: "12px 24px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#ffffff",
              background: "#0078d4",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Sign in with Microsoft
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      {/* Top nav */}
      <div
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <h1
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#0f172a",
              margin: "0",
              padding: "16px 0",
            }}
          >
            Azure Incident Dashboard
          </h1>
          <div style={{ display: "flex", gap: "4px" }}>
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "16px 16px",
                  fontSize: "14px",
                  fontWeight: activeTab === tab ? "600" : "400",
                  color: activeTab === tab ? "#0f172a" : "#64748b",
                  background: "none",
                  border: "none",
                  borderBottom:
                    activeTab === tab
                      ? "2px solid #0f172a"
                      : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.1s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          {lastUpdated && (
            <span>
              Updated{" "}
              {lastUpdated.toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
              })}
            </span>
          )}
          <button
            onClick={refresh}
            style={{
              padding: "6px 12px",
              fontSize: "12px",
              color: "#64748b",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            ↻ Refresh
          </button>
          {!DEMO_MODE && account && (
            <button
              onClick={logout}
              style={{
                padding: "6px 12px",
                fontSize: "12px",
                color: "#64748b",
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Sign out
            </button>
          )}
          {DEMO_MODE && (
            <span
              style={{
                padding: "4px 8px",
                background: "#fefce8",
                border: "1px solid #fef08a",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: "600",
                color: "#ca8a04",
              }}
            >
              DEMO
            </span>
          )}
        </div>
      </div>

      {error && (
        <div
          style={{
            background: "#fef2f2",
            borderBottom: "1px solid #fecaca",
            padding: "10px 24px",
            fontSize: "13px",
            color: "#ef4444",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ padding: "24px" }}>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {activeTab === "Dashboard" && (
              <>
                <MetricCards metrics={metrics} />
                <ResolutionChart data={mockTimelineData} />
                <AlertFeed alerts={alerts} onAlertClick={setSelectedAlert} />
              </>
            )}
            {activeTab === "Resource Health" && (
              <ResourceGrid resources={mockResources} alerts={alerts} />
            )}
            {activeTab === "Metrics Explorer" && <MetricsExplorer />}
          </>
        )}
      </div>

      <AlertDrawer
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}

export default App;
