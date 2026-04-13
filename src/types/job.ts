export type JobStatus = "applied" | "interview" | "offer" | "rejected";

export type JobApplication = {
  id: string;
  company: string;
  position: string;
  status: JobStatus;
  date: string;
};