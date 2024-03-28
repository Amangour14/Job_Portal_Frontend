import {create} from 'zustand';
import { persist } from 'zustand/middleware';
import { Card } from '../Pages/Job/Job';

 
type JobStoreState ={
  job: Card | null;
  applyOne: (job: Card) => void;
}
 
const useJobStore = create<JobStoreState>()(
  persist(
    (set) => ({
      job: null,
      applyOne: (job) => {
        set(() => ({
          job,
        }));
      },
    }),
    {
      name: 'job', 
    }
  )
);
 
export default useJobStore;