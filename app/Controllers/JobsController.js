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
        ProxyState.on("jobs", _drawJobs)
        this.loadJobs()
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
        form.reset()
        $("#new-job-modal").modal('hide');
        
    }
    deleteJob(id) {
        jobService.deleteJob(id)
    }
    
    toggleJobDraw() {
        let targetElem = document.getElementById('jobs')
        if (targetElem.classList.contains("d-none")) {
            targetElem.classList.remove("d-none")
            _drawJobs()
        } else {
            console.log('else');
            targetElem.classList.add("d-none")
        }
        
    }
    loadJobs(){
        try {
            jobService.loadJobs()
        } catch(e) {
            console.error(e)
        }
    }
}