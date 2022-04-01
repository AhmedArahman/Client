import axios from 'axios';

const url = 'http://localhost:3000/api/countries';

// let axiosConfig = {
//     headers: {
//         'Content-Type': 'application/json;charset=UTF-8',
//         "Access-Control-Allow-Origin": "*",
//     }
// };

class CountryService {
    // static getCountries() {
    //     return axios.get(url, axiosConfig);
    // }

    // Get Radiographers
    static async getCountries() {
        try {
          const response = await axios.get(url);
          return response.data
        } catch (error) {
          console.error(error);
        }
      }
}

export default CountryService;