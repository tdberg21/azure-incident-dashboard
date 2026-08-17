const SEVERITIES = ["All", "Sev0", "Sev1", "Sev2", "Sev3", "Sev4"];
const STATUSES = ["All", "New", "Acknowledged", "Resolved"];

function FilterBar({ filters, onChange, resourceGroups }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        padding: "12px 16px",
        borderBottom: "1px solid #e2e8f0",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Severity filter */}
      <div style={filterGroup}>
        <label style={labelStyle}>Severity</label>
        <select
          value={filters.severity}
          onChange={(e) => onChange({ ...filters, severity: e.target.value })}
          style={selectStyle}
        >
          {SEVERITIES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Status filter */}
      <div style={filterGroup}>
        <label style={labelStyle}>Status</label>
        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value })}
          style={selectStyle}
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Resource group filter */}
      <div style={filterGroup}>
        <label style={labelStyle}>Resource Group</label>
        <select
          value={filters.resourceGroup}
          onChange={(e) =>
            onChange({ ...filters, resourceGroup: e.target.value })
          }
          style={selectStyle}
        >
          <option value="All">All</option>
          {resourceGroups.map((rg) => (
            <option key={rg} value={rg}>
              {rg}
            </option>
          ))}
        </select>
      </div>

      {/* Reset button */}
      {(filters.severity !== "All" ||
        filters.status !== "All" ||
        filters.resourceGroup !== "All") && (
        <button
          onClick={() =>
            onChange({ severity: "All", status: "All", resourceGroup: "All" })
          }
          style={{
            padding: "6px 12px",
            fontSize: "12px",
            color: "#64748b",
            background: "none",
            border: "1px solid #e2e8f0",
            borderRadius: "6px",
            cursor: "pointer",
            marginTop: "16px",
          }}
        >
          Reset filters
        </button>
      )}
    </div>
  );
}

const filterGroup = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const labelStyle = {
  fontSize: "11px",
  fontWeight: "600",
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const selectStyle = {
  padding: "6px 10px",
  fontSize: "13px",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  background: "#ffffff",
  color: "#0f172a",
  cursor: "pointer",
};

export default FilterBar;
