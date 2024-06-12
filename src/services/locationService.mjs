import { provinces } from '../constants/provinces.js'
import { cities } from '../constants/cities.js'

const fetchAllProvince = () => {
    return provinces
}

const fetchCityByProvinceId = (provinceId) => {
    return cities.filter((city) => city.province_id === parseInt(provinceId))
}

export default {
    fetchAllProvince,
    fetchCityByProvinceId,
}
