import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { mockResources } from "../../api/mockData";

// Generate realistic fake metric data for a given metric type and time range
function generateMetricData(metric, timeRange) {
  const points = { "1h": 12, "6h": 24, "24h": 48, "7d": 56 }[timeRange];
  const labels = generateTimeLabels(timeRange, points);

  const baseValues = {
    "CPU %": { base: 45, variance: 30, unit: "%", max: 100 },
    "Memory %": { base: 62, variance: 15, unit: "%", max: 100 },
    "Request Count": { base: 240, variance: 120, unit: "req/min", max: null },
    "Error Rate %": { base: 1.2, variance: 2, unit: "%", max: 100 },
    "Network In (MB)": { base: 80, variance: 40, unit: "MB/s", max: null },
    "Network Out (MB)": { base: 55, variance: 25, unit: "MB/s", max: null },
    "Disk Read (MB)": { base: 30, variance: 20, unit: "MB/s", max: null },
    "Disk Write (MB)": { base: 20, variance: 15, unit: "MB/s", max: null },
  };

  const config = baseValues[metric] ?? {
    base: 50,
    variance: 20,
    unit: "",
    max: null,
  };
  let prev = config.base;

  return labels.map((label) => {
    // Smooth random walk — each point influenced by previous
    const delta = (Math.random() - 0.48) * config.variance;
    prev = Math.max(0, prev + delta);
    if (config.max) prev = Math.min(config.max, prev);
    return {
      time: label,
      value: parseFloat(prev.toFixed(1)),
    };
  });
}

function generateTimeLabels(timeRange, count) {
  const now = new Date();
  const labels = [];

  const intervalMs = {
    "1h": 5 * 60 * 1000,
    "6h": 15 * 60 * 1000,
    "24h": 30 * 60 * 1000,
    "7d": 3 * 60 * 60 * 1000,
  }[timeRange];

  for (let i = count - 1; i >= 0; i--) {
    const t = new Date(now - i * intervalMs);
    if (timeRange === "7d") {
      labels.push(
        t.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      );
    } else {
      labels.push(
        t.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
      );
    }
  }

  return labels;
}

const METRICS = [
  "CPU %",
  "Memory %",
  "Request Count",
  "Error Rate %",
  "Network In (MB)",
  "Network Out (MB)",
  "Disk Read (MB)",
  "Disk Write (MB)",
];

const TIME_RANGES = ["1h", "6h", "24h", "7d"];

const METRIC_COLORS = {
  "CPU %": "#ef4444",
  "Memory %": "#f97316",
  "Request Count": "#3b82f6",
  "Error Rate %": "#a855f7",
  "Network In (MB)": "#22c55e",
  "Network Out (MB)": "#14b8a6",
  "Disk Read (MB)": "#eab308",
  "Disk Write (MB)": "#64748b",
};

function SelectField({ label, value, options, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <label
        style={{
          fontSize: "11px",
          fontWeight: "600",
          color: "#64748b",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: "7px 10px",
          fontSize: "13px",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          background: "#ffffff",
          color: "#0f172a",
          cursor: "pointer",
          minWidth: "180px",
        }}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function MetricsExplorer() {
  const resourceNames = mockResources.map((r) => r.name);
  const [selectedResource, setSelectedResource] = useState(resourceNames[0]);
  const [selectedMetric, setSelectedMetric] = useState("CPU %");
  const [timeRange, setTimeRange] = useState("24h");

  const data = useMemo(() => {
    return generateMetricData(selectedMetric, timeRange);
  }, [selectedResource, selectedMetric, timeRange]);

  const lineColor = METRIC_COLORS[selectedMetric] ?? "#3b82f6";

  const currentValue = data[data.length - 1]?.value;
  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const avgValue = parseFloat(
    (data.reduce((s, d) => s + d.value, 0) / data.length).toFixed(1),
  );

  return (
    <div>
      {/* Controls */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "20px 24px",
          marginBottom: "16px",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          alignItems: "flex-end",
        }}
      >
        <SelectField
          label="Resource"
          value={selectedResource}
          options={resourceNames}
          onChange={setSelectedResource}
        />
        <SelectField
          label="Metric"
          value={selectedMetric}
          options={METRICS}
          onChange={setSelectedMetric}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label
            style={{
              fontSize: "11px",
              fontWeight: "600",
              color: "#64748b",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Time Range
          </label>
          <div style={{ display: "flex", gap: "4px" }}>
            {TIME_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                style={{
                  padding: "7px 14px",
                  fontSize: "13px",
                  fontWeight: timeRange === range ? "600" : "400",
                  color: timeRange === range ? "#ffffff" : "#64748b",
                  background: timeRange === range ? "#0f172a" : "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div
        style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "20px 24px",
        }}
      >
        {/* Chart header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "20px",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#0f172a",
                margin: "0 0 2px 0",
              }}
            >
              {selectedMetric}
            </h2>
            <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
              {selectedResource} · last {timeRange}
            </p>
          </div>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {[
              { label: "Current", value: currentValue },
              { label: "Avg", value: avgValue },
              { label: "Max", value: maxValue },
              { label: "Min", value: minValue },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "6px 14px",
                  background: "#f8fafc",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <span
                  style={{
                    fontSize: "11px",
                    color: "#94a3b8",
                    fontWeight: "600",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip
              contentStyle={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                fontSize: "13px",
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MetricsExplorer;
