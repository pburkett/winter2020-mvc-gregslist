import { ProxyState } from "../AppState.js"
import { jobService } from "../Services/JobsService.js"

function _drawJobs() {
    console.log('DrawJobs() called');
    let template = ''
    ProxyState.jobs.forEach(job => {
        template += job.Template
    })
    document.getElementById("jobs").innerHTML = template
}

export default class JobsController {
    constructor() {
        console.log("JobsController init");
        ProxyState.on("jobs", _drawJobs)
        _drawJobs()
    }

    createJob() {
        window.event.preventDefault()
        let form = window.event.target
        let jobObj = {
            company: form['company'].value,
            jobTitle: form['jobTitle'].value,
            hours: form['hours'].value,
            rate: form['rate'].value,
            description: form['description'].value
        }
        jobService.createJob(jobObj)
    }
    deleteJob(id) {
        jobService.deleteJob(id)
    }

}