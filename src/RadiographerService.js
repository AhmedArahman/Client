import axios from 'axios';

const url = 'http://localhost:3000/api/radiographers/signup/';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

class RadiographerService {

    // Get Radiographers
    static getRadiographers() {
        return axios.get(url);
    }

    // Create Radiographer
    static insertRadiographer(name, email, password, homeAddress, workAddress, 
        phoneNumber, countries, jobType, expectedSalary, license, degree, 
        qualifications, modalities) {
        return axios.post(url, {
            name: name, 
            email: email, 
            password: password,
            homeAddress: homeAddress,
            workAddress: workAddress,
            phoneNumber: phoneNumber,
            countries: countries,
            jobType: jobType,
            expectedSalary: expectedSalary,
            license: license,
            degree: degree,
            qualifications: qualifications,
            modalities: modalities
        }, 
        axiosConfig)
    }

    // Delete Radiographer
    static deleteRadiographer(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default RadiographerService;