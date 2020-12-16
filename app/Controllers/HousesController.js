import { ProxyState } from "../AppState.js";
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
        houseService.createHouse(houseObj)
    }

    toggleHouseDraw() {
        console.log('HousesController: toggleHouseDraw() called');
        let targetElem = document.getElementById('houses')
        if (targetElem.innerHTML == '') {
            _drawHouses()
        } else {
            console.log('else');
            targetElem.innerHTML = ''
        }

    }
    deleteHouse(id) {
        console.log('housesController: deletehouse() called');
        houseService.deleteHouse(id)

    }
}

