export type User = {
  email: string;
  password?: string;
  token?: string;
};

export type FormValues = {
  fullName: string;
  email: string;
  resume: File | null;
  experience: string;
};

export type ApplyAttributes = {
  JobJobId: Card | null;
  jobApplication: FormValues;
};

export type Card = {
  jobId: number;
  jobTitle: string;
  remote_or_onsite: string;
  location: string;
  fulltime_or_parttime: string;
  salary: string;
  job_description: string;
  job_responsibility: string;
  educational_requirement: string;
  experiences: string;
};
export type Contact = {
  email: string;
  name: string;
  message: string;
};

export type GetAPIProps = {
  url: string;
  configData?: unknown;
  token?: string | null;
  page?: number;
  limit?: number;
};

export type PostAPIProps = {
  url: string;
  payload: Record<string, unknown>;
  token?: string | null;
};
