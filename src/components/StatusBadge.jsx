function StatusBadge({ status }) {
  const key = status.toLowerCase();
  const chipClass =
    key === "paid"
      ? "chip-success"
      : key === "pending"
        ? "chip-warning"
        : key === "cancelled" || key === "overdue"
          ? "chip-error"
          : "chip-draft";

  return <span className={`status-badge chip ${key} ${chipClass}`}>{status}</span>;
}

export default StatusBadge;
