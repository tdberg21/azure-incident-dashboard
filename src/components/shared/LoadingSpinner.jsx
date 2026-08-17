function LoadingSpinner() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px",
        color: "#94a3b8",
        fontSize: "14px",
        gap: "10px",
      }}
    >
      <div
        style={{
          width: "16px",
          height: "16px",
          border: "2px solid #e2e8f0",
          borderTop: "2px solid #64748b",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      Loading alerts...
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default LoadingSpinner;
