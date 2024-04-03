import { create } from "zustand";
import { Card } from "../Pages/Job/Job";

const LOCAL_STORAGE_KEY = "jobStoreState";

const initialState = {
  job: null,
};

const persistedState =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "null") || initialState;

type JobStoreState = {
  job: Card | null;
  applyOne: (job: Card) => void;
};

const useJobStore = create<JobStoreState>((set) => ({
  job: persistedState.job,
  applyOne: (job) => {
    set(() => ({ job }));
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ job }));
  },
}));

export default useJobStore;
