import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ResolutionChart({ data }) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "20px 24px",
        marginBottom: "24px",
      }}
    >
      <h2
        style={{
          fontSize: "15px",
          fontWeight: "600",
          color: "#0f172a",
          margin: "0 0 20px 0",
        }}
      >
        Alerts Fired vs Resolved
        <span
          style={{
            marginLeft: "8px",
            fontSize: "13px",
            fontWeight: "400",
            color: "#64748b",
          }}
        >
          last 14 days
        </span>
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
          barCategoryGap="30%"
          barGap={4}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#f1f5f9"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={24}
          />
          <Tooltip
            contentStyle={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              fontSize: "13px",
            }}
            cursor={{ fill: "#f8fafc" }}
          />
          <Legend wrapperStyle={{ fontSize: "13px", paddingTop: "16px" }} />
          <Bar
            dataKey="fired"
            name="Fired"
            fill="#ef4444"
            radius={[3, 3, 0, 0]}
          />
          <Bar
            dataKey="resolved"
            name="Resolved"
            fill="#22c55e"
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ResolutionChart;
