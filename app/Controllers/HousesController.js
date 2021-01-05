import { ProxyState } from "../AppState.js";
import House from "../Models/House.js";
import { api } from "../Services/AxiosService.js";
import { houseService } from "../Services/HouseService.js"

function _drawHouses() {
    console.log('House Controller: drawing houses!');
    let houses = ProxyState.houses
    let template = ''
    houses.forEach(house => {
        template += house.Template
    })
    document.getElementById("houses").innerHTML = template
}

export default class HousesController {
    constructor() {
        console.log('HouseController init');
        ProxyState.on("houses", _drawHouses)
        this.loadHouses()
        _drawHouses()
    }
    createHouse() {
        console.log('HousesController.createHouse called!');
        window.event.preventDefault()
        let form = window.event.target
        let houseObj = {
            bedrooms: form['bedrooms'].value,
            bathrooms: form['bathrooms'].value,
            levels: form['levels'].value,
            imgUrl: form['imgUrl'].value,
            year: form['year'].value,
            price: form['price'].value,
            description: form['description'].value
        }
        form.reset()
        $("#new-house-modal").modal('hide');
        try {
            houseService.createHouse(houseObj)
        } catch(e) {
            console.error(e)
        }
    }

    toggleHouseDraw() {
        console.log('HousesController: toggleHouseDraw() called');
        let targetElem = document.getElementById('houses')
        if (targetElem.classList.contains("d-none")) {
            targetElem.classList.remove("d-none")
            _drawHouses()
        } else {
            console.log('else');
            targetElem.classList.add("d-none")
        }

    }
    deleteHouse(id) {
        try {
        houseService.deleteHouse(id)
        } catch(e){
            console.error(e)
        }
    }
    loadHouses(){
        try{
            houseService.loadHouses()
        } catch(e){
            console.error(error)
        }
    }
    shuffleImages(){
        try {
            houseService.shuffleImages()
        } catch(e) {
        console.error(e)
        }
    }
    freeRealEstate() {
        try {
            houseService.freeRealEstate()
        } catch(e) {
            console.error(e)
        }
    }
    fillInDescrips(){
        try {
            houseService.fillInDescrips()
        } catch(e) {
        console.error(e)
        }
    }
    frankenstein(){
        try{
            houseService.frankenstein()
        } catch(e) {
            console.error(e)
        }
    }
}

