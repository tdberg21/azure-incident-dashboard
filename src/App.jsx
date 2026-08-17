import { useState } from "react";
import { mockAlerts, mockTimelineData, mockResources } from "./api/mockData";
import {
  calculateMTTR,
  calculateMTTA,
  calculateSLACompliance,
} from "./utils/formatters";
import MetricCards from "./components/MetricCards/MetricCards";
import AlertFeed from "./components/AlertFeed/AlertFeed";
import AlertDrawer from "./components/AlertDrawer/AlertDrawer";
import ResolutionChart from "./components/Charts/ResolutionChart";
import ResourceGrid from "./components/ResourceGrid/ResourceGrid";

const TABS = ["Dashboard", "Resource Health"];

function App() {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [activeTab, setActiveTab] = useState("Dashboard");

  const metrics = {
    activeCount: mockAlerts.filter((a) => a.status !== "Resolved").length,
    mtta: calculateMTTA(mockAlerts),
    mttr: calculateMTTR(mockAlerts),
    sla: calculateSLACompliance(mockAlerts),
  };

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
          gap: "24px",
        }}
      >
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

      {/* Page content */}
      <div style={{ padding: "24px" }}>
        {activeTab === "Dashboard" && (
          <>
            <MetricCards metrics={metrics} />
            <ResolutionChart data={mockTimelineData} />
            <AlertFeed alerts={mockAlerts} onAlertClick={setSelectedAlert} />
          </>
        )}

        {activeTab === "Resource Health" && (
          <ResourceGrid resources={mockResources} alerts={mockAlerts} />
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
