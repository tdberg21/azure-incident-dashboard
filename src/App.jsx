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
import AlertDrawer from "./components/AlertDrawer/AlertDrawer";

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
      <AlertDrawer
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
      />
    </div>
  );
}

export default App;
