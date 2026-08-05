// src/App.jsx
import { useState } from "react";
import { mockAlerts } from "./api/mockData";
import {
  calculateMTTR,
  calculateMTTA,
  calculateSLACompliance,
} from "./utils/formatters";
import MetricCards from "./components/MetricCards/MetricCards";
import AlertFeed from "./components/AlertFeed/AlertFeed";

function App() {
  const [selectedAlert, setSelectedAlert] = useState(null);

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
        padding: "24px",
        background: "#f8fafc",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#0f172a",
          marginBottom: "24px",
        }}
      >
        Azure Incident Dashboard
      </h1>
      <MetricCards metrics={metrics} />
      <AlertFeed alerts={mockAlerts} onAlertClick={setSelectedAlert} />
      {selectedAlert && (
        <div
          style={{
            marginTop: "16px",
            padding: "16px",
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
          }}
        >
          <strong>Selected:</strong> {selectedAlert.name}
        </div>
      )}
    </div>
  );
}

export default App;
