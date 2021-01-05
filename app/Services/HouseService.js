import House from '../Models/House.js'
import { ProxyState } from '../AppState.js'
import {api} from "./AxiosService.js"

class HouseService {
    async deleteHouse(id) {
        ProxyState.houses = ProxyState.houses.filter(car => car.id != id)
        await api.delete("houses/"+id)
    }
    async createHouse(newHouseObj) {
        console.log('house service: creating house');

        let res = await api.post("houses", newHouseObj)
        
        let newHouse = new House(res.data)
        ProxyState.houses = [...ProxyState.houses, newHouse]
        
    }
    async loadHouses(){
        let axiosObj = await api.get("houses")
        let houses = axiosObj.data.map(h => new House(h))
        ProxyState.houses = [...ProxyState.houses, ...houses]
    }
    async shuffleImages() {
        let savedVar = ProxyState.houses[0].description
        for (let ind in ProxyState.houses) {
            let ind1 = Number(ind)+1
            if ( ind == ProxyState.houses.length - 1) { 
                ProxyState.houses[ind].description = savedVar
            } else {

            ProxyState.houses[ind].description = ProxyState.houses[ind1].description
        }
            ProxyState.houses = ProxyState.houses
        }
        for (let ind in ProxyState.houses) {
            api.put("houses/"+ProxyState.houses[ind].id, {description: ProxyState.houses[ind].description} )
        }
    }
    async freeRealEstate(){
        await api.put("houses/"+ProxyState.houses[0].id, {price: 'not a number'})
    }
    async fillInDescrips(){
        await ProxyState.houses.forEach(h => h.description ? '' : api.put("houses/"+h.id, {description: "default description string"}))
    }

    async frankenstein(){
        let x = {}
        x['bedrooms'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].bedrooms
        x['bathrooms'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].bathrooms
        x['levels'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].levels
        x['imgUrl'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].imgUrl
        x['year'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].year
        x['year'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].year
        x['price'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].price
        x['description'] = ProxyState.houses[Math.floor(ProxyState.houses.length * Math.random())].description
        console.log(x);
        let res = await api.post("houses", x)
        console.log(res);
        ProxyState.houses = [...ProxyState.houses, new House(res.data)]

    }
}

export const houseService = new HouseService()