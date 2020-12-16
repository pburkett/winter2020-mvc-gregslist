import { ProxyState } from "../AppState.js"
import { carsService } from "../Services/CarsService.js"

function _drawCars() {

  let cars = ProxyState.cars
  let template = ''
  cars.forEach(car => {
    // NOTE Getters FAKE properties as methods
    template += car.Template
  })
  document.getElementById('cars').innerHTML = template
}

export default class CarsController {
  constructor() {
    ProxyState.on("cars", _drawCars)
    _drawCars()
  }

  createCar() {
    window.event.preventDefault()
    let form = window.event.target
    let newCar = {
      make: form['make'].value,
      model: form['model'].value,
      year: form['year'].value,
      price: form['price'].value,
      description: form['description'].value,
      imgUrl: form['imgUrl'].value
    }
    carsService.createCar(newCar)
    // @ts-ignore
    form.reset()
    // @ts-ignore
    $("#new-car-modal").modal('hide');
  }
  // $("#new-car-modal").modal('hide');

  toggleCarDraw() {
    console.log('CarsController: toggleCarDraw() called');
    let targetElem = document.getElementById('cars')
    if (targetElem.innerHTML == '') {
      _drawCars()
    } else {
      console.log('else');
      targetElem.innerHTML = ''
    }

  }

  deleteCar(id) {
    carsService.deleteCar(id)
  }
}