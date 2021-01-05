import { generateId } from "../Utils/GenerateId.js"

export default class Job {
    constructor({ company, jobTitle, hours, rate, description, id }) {
    
        this.id = id
        this.company = company
        this.jobTitle = jobTitle
        this.hours = hours
        this.rate = rate
        this.description = description
        
    }
    get Template() {
        
        return `
<div class="col-md-4 col-6 px-3 pb-3">
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">${this.jobTitle} at ${this.company} </h4>
            <h5 class="cart-text">Weekly Hours: ${this.hours}</h5>
            <p class="card-text">${this.description}</p>
            <h5 class="card-text">Compensation: $${this.rate}</h5>
            <div class="text-right">
                <button type="button" class="btn btn-danger" onclick="app.jobsController.deleteJob('${this.id}')">Delete</button>
            </div>
        </div>
    </div>
</div>
        `
    }
}