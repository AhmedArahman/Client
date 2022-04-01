<template>
  <div>
      <div class="basic-information">
          <h2>Owner Information</h2>
          <hr>
          <input type="text" class="first-name" v-model="ownerFirstName" placeholder="First Name">
          <input type="text" class="last-name" v-model="ownerLastName" placeholder="Last Name">
          <input type="email" class="email" v-model="ownerEmail" placeholder="Email" required>
          <input type="tel" pattern="^01[0-2]\d{1,8}$" class="password"  v-model="ownerPhoneNumber" placeholder="Phone Number">
          <input type="text" class="home-address" v-model="ownerHomeAddress" placeholder="Address">
      </div>

      <div class="basic-information">
        <h2>Director Information</h2>
        <hr>
        <input type="text" class="first-name" v-model="directorFirstName" placeholder="First Name">
        <input type="text" class="last-name" v-model="directorLastName" placeholder="Last Name">
        <input type="email" class="email" v-model="directorEmail" placeholder="Email" required>
        <input type="tel" pattern="^01[0-2]\d{1,8}$" class="password"  v-model="directorPhoneNumber" placeholder="Phone Number">
        <input type="text" class="home-address" v-model="directorHomeAddress" placeholder="Address">
        <label for="">Qualifications: </label> <span style="font-style: italic;"> Add up to 15 comma separated skills</span>
        <br>
        <input type="text" class="countries" v-model="tempSkillQualifications" @keyup="addQualification" placeholder="Enter your qualifications comma separated..">
        <div class="pill" v-for="skill in qualifications" :key="skill">
            <p @click="removeQualification(skill)">{{ skill }}</p>
        </div>
      </div>

      <div class="medical-information">
        <h2>Facility Information</h2>
        <hr>
        <input type="text" class="first-name" v-model="facilityName" placeholder="Facility Name" required>
        <input type="text" class="home-address" v-model="facilityAddress" placeholder="Facility Address">
      </div>

      <div class="basic-information">
            <h2>Modalities</h2>
            <hr>
            <br>
            <label for="" class="modalities-label">Modalities: *</label>
            <br>
            <select class="countries" v-model="tempSkillModality" @change="addModality">
                <option value="" disabled selected>Add 1 or more</option>
                <option value="plain x-rays0">Plain x-rays</option>
                <option value="fluoroscopy1">Fluoroscopy</option>
                <option value="nuclear medicine2">Nuclear medicine</option>
                <option value="ultrasound3">Ultrasound (US)</option>
                <option value="computed tomography4">Computed tomography (CT)</option>
                <option value="magnetic resonance imaging5">Magnetic resonance imaging (MRI)</option>
                <option value="hybrid modalities6">Hybrid e.g. PET-CT, PET-MRI</option>
            </select>
            <div class="" v-for="modality in modalities" :key="modality[1]">
                <label @click="removeModality(modality[0])" style="cursor:pointer;" >{{ modality[0] }} specialty</label>
                <select class="countries" v-model="tempSkillSpecialty" @change="addSpecialty(modality[1])">
                    <option value="" disabled selected>Add 1 or more</option>
                    <option value="head">Head</option>
                    <option value="abdomen">Abdomen</option>
                    <option value="hand">Hand</option>
                    <option value="leg">Leg</option>
                    <option value="back">Back</option>
                </select>
                <div class="pill" v-for="skill in modalitiesSpecialty[modality[1]]" :key="skill">
                    <p @click="removeSpecialty(skill, modality[1])">{{ skill }}</p>
                </div>
                <br>
                <label for=""> {{ modality[0] }} description </label>
                <br>
                <input type="text" v-model="modalitiesDescription[modality[1]]">
            </div>
            <br>
      </div>

      <input type="checkbox" name="" id=""  v-model="terms">
      <label style="color: #737373;" for="">Accept Terms and Conditions</label>

       <div class="submit">
            <button @click="createFacility">Create an Account</button>
       </div>
  </div>
</template>

<script>
import FacilityService from '../FacilityService'

export default {
    data() {
        return {
            ownerFirstName: '',
            ownerLastName: '',
            ownerEmail: '',
            ownerHomeAddress: '',
            ownerPhoneNumber: '',
            directorFirstName: '',
            directorLastName: '',
            directorEmail: '',
            directorHomeAddress: '',
            directorPhoneNumber: '',
            qualifications: [],
            facilityName: '',
            facilityAddress: '',
            modalities: [],
            modalitiesBackend: [],
            modalitiesSpecialty: [],
            modalitiesDescription: [],
            terms: false,
            tempSkillQualifications: '',
            tempSkillModality: '',
            tempSkillSpecialty: '',
            tempSkillDescription: '',
            passwordError: '',
        }
    },
    methods: {
        addQualification(e) {
            if (e.key === ',' && this.tempSkillQualifications) {
                if (!this.qualifications.includes(this.tempSkillQualifications) && this.qualifications.length < 15) {
                    this.qualifications.push(this.tempSkillQualifications.substring(0, this.tempSkillQualifications.length - 1));
                }
                this.tempSkillQualifications = '';
            }
        },
        removeQualification(skill) {
            this.qualifications= this.qualifications.filter((item) => {
                return item !== skill;
            });
        },
        addModality() {
            if (this.tempSkillModality) {
                if (!this.modalities.includes(this.tempSkillModality)) {
                    this.modalities.push(
                        [this.tempSkillModality.substring(0, this.tempSkillModality.length-1), 
                        this.tempSkillModality[this.tempSkillModality.length-1]]
                    );
                    this.modalitiesBackend.push(this.tempSkillModality.substring(0, this.tempSkillModality.length-1));
                }
                this.tempSkillModality = '';
            }
        },
        removeModality(skill) {
            console.log(this.modalities.length + " " + this.modalitiesBackend.length);
            this.modalities = this.modalities.filter((item) => {
                return item[0] !== skill;
            });
            this.modalitiesBackend = this.modalitiesBackend.filter((item) => {
                return item !== skill;
            });
            console.log(this.modalities.length + " " + this.modalitiesBackend.length);
        },
        addSpecialty(index) {
            if (this.tempSkillSpecialty) {
                if(this.modalitiesSpecialty[index]) {
                    if (!this.modalitiesSpecialty[index].includes(this.tempSkillSpecialty)) {
                        this.modalitiesSpecialty[index].push(this.tempSkillSpecialty); 
                    }
                    this.tempSkillSpecialty = '';
                }
                else {
                    this.modalitiesSpecialty[index] = [this.tempSkillSpecialty];
                    this.tempSkillSpecialty = '';
                }
            }
        },
        removeSpecialty(skill, index) {
            this.modalitiesSpecialty[index] = this.modalitiesSpecialty[index].filter((item) => {
                return item !== skill;
            });
        },
        async createFacility() {
            await FacilityService.insertFacility(
                this.ownerFirstName + " " + this.ownerLastName, 
                this.ownerPhoneNumber, 
                this.ownerEmail, 
                this.ownerHomeAddress, 
                this.directorFirstName + " " + this.directorLastName,
                this.directorPhoneNumber, 
                this.directorEmail, 
                this.directorHomeAddress, 
                this.qualifications, 
                this.facilityName, 
                this.facilityAddress, 
                this.modalitiesBackend, 
                this.modalitiesSpecialty,
                this.modalitiesDescription
            );
            this.facilities = await FacilityService.getFacilities();
        },
        async deleteFacility(id) {
          await FacilityService.deleteFacility(id);
          this.facilities = await FacilityService.getFacilities();
        }
    }
}
</script>


<style scoped>
    .basic-information {
        max-width: 700px;
        margin: 50px auto 30px auto;
        text-align: left;
        padding: 20px 40px 40px;
        border-radius: 10px;
        background: white;
        height: auto;
    }
    .medical-information {
        max-width: 700px;
        margin: 50px auto 30px auto;
        text-align: left;
        padding: 20px 40px 40px;
        border-radius: 10px;
        background: white;
        height: auto;
    }
    h2 {
        font-size: 2em;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        color: #737373;
        margin-bottom: 5px;
    }
    hr {
        margin-top: 0;
        border: none;
        height: 12px;
        width: 200px;
        float: left;
        background: #1687A7;
        margin-bottom: 60px;
        display: inline-block;
    }
    label {
        color: #1687A7;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 1.2em;
        letter-spacing: 1px;
        font-weight: bold;
    }
    .modalities-label {
        position: relative;
        right: 28.5%;
    }
    input,select {
        padding: 10px 6px;
        box-sizing: border-box;
        border-radius: 5px;
        background: #D3E0EA;
        font-size: 1em;
        width: 250px;
    }
    .first-name {
        position: relative;
        margin: 7% 0 7% 0;
        right: 28.5%;
    }
    .last-name {
        position: relative;
    }
    .email {
        position: relative;
        margin: 0 0 5% 0;
    }
    .password {
        position: relative;
        margin-left: 28.5%;
    }
    .home-address {
        position: relative;
        margin-bottom: 5%;
        width: 100%;
    }
    .phone {
        position: relative;
    }
    .work-address {
        position: relative;
        margin-top: 8%;
        right: 28.5%;
    }
    .job-type {
        position: relative;
        right: 5%;
    }
    .countries {
        width: 100%;
    }
    .license {
        position: relative;
        top: 13%;
        right: 28.5%;
    }
    .degree {
        position: relative;
        top: 13%;
    }
    input[type="checkbox"] {
        display: inline-block;
        width: 16px;
        margin: 0 10px 0 0;
        position: relative;
        top: 2px;
    }
    .pill {
        display: inline-block;
        margin: 20px 10px 0 0;
        padding: 6px 12px;
        background: #eee;
        border-radius: 20px;
        font-size: 12px;
        letter-spacing: 1px;
        font-weight: bold;
        color: #1687A7;
        cursor: pointer;
    }
    .submit {
        text-align: center;
        padding-bottom: 50px;
    }
    button {
        background: #1687A7;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
        cursor: pointer;
    }
    .error {
        color: #ff0062;
        margin-top: 10px;
        font-size: 0.8em;
        font-weight: bold;
    }
</style>
