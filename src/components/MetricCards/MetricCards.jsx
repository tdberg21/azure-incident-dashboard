// src/components/MetricCards/MetricCards.jsx

function MetricCard({ label, value, subtitle, valueColor }) {
  return (
    <div style={{
      background: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      padding: '20px 24px',
      flex: '1',
      minWidth: '160px'
    }}>
      <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '8px' }}>
        {label}
      </div>
      <div style={{ fontSize: '28px', fontWeight: '700', color: valueColor ?? '#0f172a' }}>
        {value}
      </div>
      {subtitle && (
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
          {subtitle}
        </div>
      )}
    </div>
  )
}

function MetricCards({ metrics }) {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <MetricCard
        label="Active Alerts"
        value={metrics.activeCount}
        subtitle="not yet resolved"
        valueColor={metrics.activeCount > 5 ? '#ef4444' : '#f97316'}
      />
      <MetricCard
        label="Avg Time to Acknowledge"
        value={metrics.mtta}
        subtitle="last 7 days"
      />
      <MetricCard
        label="Avg Time to Resolve"
        value={metrics.mttr}
        subtitle="last 7 days"
      />
      <MetricCard
        label="SLA Compliance"
        value={metrics.sla}
        subtitle="ack within 15 min"
        valueColor="#22c55e"
      />
    </div>
  )
}

export default MetricCards