import { mockAlerts, mockTimelineData } from "./api/mockData";
import {
  calculateMTTR,
  calculateMTTA,
  calculateSLACompliance,
} from "./utils/formatters";
import MetricCards from "./components/MetricCards/MetricCards";

function App() {
  const activeAlerts = mockAlerts.filter((a) => a.status !== "Resolved");

  const metrics = {
    activeCount: activeAlerts.length,
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
    </div>
  );
}

export default App;
