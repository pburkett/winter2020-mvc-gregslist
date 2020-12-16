import Job from "../Models/Job.js"
import { ProxyState } from "../AppState.js"

export default class JobService {
    constructor() {
        console.log('jobservice.js init');
    }

    createJob(newJobObj) {
        let newJob = new Job(newJobObj)
        ProxyState.jobs = [...ProxyState.jobs, newJob]
    }

    deleteJob(id) {
        ProxyState.jobs = ProxyState.jobs.filter(job => job.id != id)
    }
}


export const jobService = new JobService()