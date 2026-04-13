import type { JobApplication, JobStatus } from "../types/job";

type Props = {
  job: JobApplication;
  onDelete: (id: string) => void;
  onEdit: (job: JobApplication) => void;
};

const statusColor = (status: JobStatus) => {
  switch (status) {
    case "applied":
      return "#3b82f6";
    case "interview":
      return "#facc15";
    case "rejected":
      return "#ef4444";
    case "offer":
      return "#22c55e";
    default:
      return "#999";
  }
};

const JobCard = ({ job, onDelete, onEdit }: Props) => {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 14,
        padding: 16,
        border: "1px solid #eef0f3",
        boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{job.company}</h3>

        <span
          style={{
            background: statusColor(job.status),
            color: "#fff",
            fontSize: 12,
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          {job.status}
        </span>
      </div>

      <p style={{ margin: "8px 0", color: "#555" }}>
        {job.position}
      </p>

      <small style={{ color: "#888" }}>
        {new Date(job.date).toLocaleDateString()}
      </small>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          onClick={() => onEdit(job)}
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            background: "#fff",
            cursor: "pointer",
          }}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(job.id)}
          style={{
            flex: 1,
            padding: "6px 10px",
            borderRadius: 8,
            border: "1px solid #fee2e2",
            background: "#fff",
            color: "#ef4444",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;