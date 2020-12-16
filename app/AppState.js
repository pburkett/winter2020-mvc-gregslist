import Car from "./Models/Car.js"
import House from "./Models/House.js"
import Job from "./Models/Job.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {Car[]} */
  cars = [new Car({ make: "Benz", model: "1", year: 1985, price: 10, description: "Its old", imgUrl: "https://d1vl6ykwv1m2rb.cloudfront.net/blog/wp-content/uploads/2018/03/20142414/auto-11.jpg" })]
  houses = [new House({ bedrooms: 30, bathrooms: 25, levels: 5, year: 1705, price: 1000000, description: "experiences infrequent pillages", imgUrl: "https://www.how-to-draw-cartoons-online.com/image-files/xcartoon_castle.gif.pagespeed.ic.6AKG3edEiK.png" })]
  jobs = [new Job({ company: "Mushroom Republic", jobTitle: "Bowser Hunter", hours: 80, rate: 7.25, description: "yea so, mario died," })]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
