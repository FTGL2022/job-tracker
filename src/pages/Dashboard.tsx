import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import type { JobApplication, JobStatus } from "../types/job";

const Dashboard = () => {
  const [jobs, setJobs] = useState<JobApplication[]>(() => {
    const stored = localStorage.getItem("jobs");
    return stored ? (JSON.parse(stored) as JobApplication[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("jobs", JSON.stringify(jobs));
  }, [jobs]);

  const [filter, setFilter] = useState<JobStatus | "all">("all");

  const filteredJobs =
    filter === "all"
      ? jobs
      : jobs.filter((job) => job.status === filter);

  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState<JobStatus>("applied");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  };

  const openNewJob = () => {
    setEditingId(null);
    setCompany("");
    setPosition("");
    setStatus("applied");
    setIsModalOpen(true);
  };

  const startEdit = (job: JobApplication) => {
    setEditingId(job.id);
    setCompany(job.company);
    setPosition(job.position);
    setStatus(job.status);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setCompany("");
    setPosition("");
    setStatus("applied");
  };

  const addJob = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      setJobs((prev) =>
        prev.map((job) =>
          job.id === editingId
            ? { ...job, company, position, status }
            : job
        )
      );
    } else {
      const newJob: JobApplication = {
        id: crypto.randomUUID(),
        company,
        position,
        status,
        date: new Date().toISOString(),
      };

      setJobs((prev) => [newJob, ...prev]);
    }

    closeModal();
  };

  return (
    <div
      style={{
        padding: 24,
        maxWidth: 1100,
        margin: "0 auto",
        fontFamily: "Inter, Arial, sans-serif",
        background: "#f5f7fb",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>
        Job Tracker
      </h1>

      <button
        onClick={openNewJob}
        style={{
          marginBottom: 16,
          padding: "10px 14px",
          borderRadius: 8,
          border: "none",
          background: "#111",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        + New Job
      </button>

      {/* FILTERS */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {(["all", "applied", "interview", "rejected", "offer"] as const).map(
          (f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 12px",
                borderRadius: 999,
                border: "1px solid #e5e7eb",
                background: filter === f ? "#111" : "#fff",
                color: filter === f ? "#fff" : "#333",
                cursor: "pointer",
                fontSize: 13,
              }}
            >
              {f}
            </button>
          )
        )}
      </div>

      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onDelete={deleteJob}
            onEdit={startEdit}
          />
        ))}
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 14,
              width: 400,
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            }}
          >
            <h2 style={{ marginBottom: 15 }}>
              {editingId ? "Edit Job" : "New Job"}
            </h2>

            <form onSubmit={addJob}>
              <input
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  padding: 8,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                }}
              />

              <input
                placeholder="Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  padding: 8,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                }}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as JobStatus)}
                style={{
                  width: "100%",
                  marginBottom: 10,
                  padding: 8,
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                }}
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="rejected">Rejected</option>
                <option value="offer">Offer</option>
              </select>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    background: "#111",
                    color: "#fff",
                    border: "none",
                    padding: 10,
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  {editingId ? "Save" : "Create"}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  style={{
                    flex: 1,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    padding: 10,
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;