import axios from 'axios';

const url = 'http://localhost:3000/api/facilities/signup/';

let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

class FacilityService {

    // Get Facilities
    static getFacilities() {
        return axios.get(url);
    }

    // Create Facility
    static insertFacility(ownerName, ownerPhoneNumber, ownerEmail, ownerHomeAddress, directorName, 
        directorPhoneNumber, directorEmail, directorHomeAddress, directorQualifications, facilityName, 
        facilityAddress, facilityModalities, modalitiesSpecialty, modalitiesDescription) {
            console.log(ownerName, ownerEmail, directorEmail);
        return axios.post(url, {
            ownerName: ownerName,
            ownerPhoneNumber: ownerPhoneNumber,
            ownerEmail: ownerEmail,
            ownerHomeAddress: ownerHomeAddress,
            directorName: directorName,
            directorPhoneNumber: directorPhoneNumber,
            directorEmail: directorEmail,
            directorHomeAddress: directorHomeAddress,
            directorQualifications: directorQualifications,
            facilityName: facilityName,
            facilityAddress: facilityAddress,
            facilityModalities: facilityModalities,
            modalitiesSpecialty: modalitiesSpecialty,
            modalitiesDescription: modalitiesDescription
        }, 
        axiosConfig)
    }

    // Delete Facility
    static deleteFacility(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default FacilityService;