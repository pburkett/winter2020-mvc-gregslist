import House from '../Models/House.js'
import { ProxyState } from '../AppState.js'

class HouseService {
    deleteHouse(id) {
        ProxyState.houses = ProxyState.houses.filter(car => car.id != id)
    }
    createHouse(newHouseObj) {
        console.log('house service: creating house');

        let newHouse = new House(newHouseObj)
        ProxyState.houses = [...ProxyState.houses, newHouse]
    }

}

export const houseService = new HouseService()