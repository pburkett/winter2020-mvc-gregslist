import Job from "../Models/Job.js"
import { ProxyState } from "../AppState.js"
import {api} from "./AxiosService.js"

export default class JobService {
    constructor() {
        console.log('jobservice.js init');

       
    }

    async createJob(newJobObj) {
        let res = await api.post("jobs", newJobObj)
        let newJob = new Job(res.data)
        ProxyState.jobs = [...ProxyState.jobs, newJob]
    }

    async deleteJob(id) {
        ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)

        await api.delete("jobs/"+id)
    }
    async loadJobs(){
        let axiosObj = await api.get("jobs")
        let jobject = axiosObj.data.map(j => new Job(j))
        ProxyState.jobs = [...ProxyState.jobs, ...jobject]
    }
}


export const jobService = new JobService()