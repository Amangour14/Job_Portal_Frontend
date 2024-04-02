import { useQuery } from "react-query"
import Job  from "./Job"
import { fetchJobs } from "../../Services/JobPagination";
import { useState } from "react";

const Jobs = () => {
  
  const[page,setPage]=useState(1);
    const allJobs=useQuery({
        queryKey:["jobs",page],
        queryFn:()=>fetchJobs(page),
    })

    if(allJobs.isLoading){
      return <h2>Loading...</h2>
    }

    if(allJobs.isError){
      return <h2>Error Occured</h2>
    }

  
  return (
    <>
    <div style={{display:"flex",flexWrap:"wrap",gap:"10px",margin:"10px"}}>
    {
        allJobs.data?.map((item)=>(
            <div key={item.jobId}>
                <Job jobId={item.jobId} jobTitle={item.jobTitle}  job_description={item.job_description} location={item.location} />
            </div>
        ))
    }
    </div>
    <div>
      <center>
      <button onClick={()=>setPage(page=>page-1)} disabled={page===1}>Prev Page</button>
      <button onClick={()=>setPage(page=>page+1)} disabled={page===2}>Next</button>
      </center>
    </div>
    </>
    
  )
}

export default Jobs