import axios from 'axios';

const url = 'http://localhost:3000/api/radiographers/signup/';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

class RadiographerService {

    // // Get Radiographers
    // static getRadiographers() {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const res = await axios.get(url);
    //             const data = res.data;
    //             resolve(
    //                 data.map(radiographer => ({
    //                     ...radiographer
    //                 }))
    //             );
    //         } 
    //         catch (err) {
    //             reject(err);
    //         }
    //     })
    // }

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
         .then(res => console.log(res))
        .catch(err => console.log('Login: ', err));
    }

    // Delete Radiographer
    static deleteRadiographer(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default RadiographerService;