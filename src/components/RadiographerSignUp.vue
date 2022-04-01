<template>
  <div>
      <div class="basic-information">
          <h2>Basic Information</h2>
          <hr>
          <input type="text" class="first-name" v-model="firstName" placeholder="First Name">
          <input type="text" class="last-name" v-model="lastName" placeholder="Last Name">
          <input type="email" class="email" v-model="email" placeholder="Email" required>
          <input type="password" class="password" v-model="password" placeholder="Password">
          <div v-if="passwordError" class="error"> {{ passwordError }} </div>
          <input type="text" class="home-address" v-model="homeAddress" placeholder="Home Address">
          <input type="tel" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" class="phone"  v-model="phoneNumber" placeholder="Phone Number">
      </div>

      <div class="basic-information">
        <h2>Work Information</h2>
        <hr>
        <input type="text" class="work-address"  v-model="workAddress" placeholder="Work Address">
        <select class="job" v-model="jobType">
            <option value="" disabled selected>Job Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
        </select>
        <label for="">Where can you work?</label> <span style="font-style: italic;"> Add 1 or more</span>
        <br>
        <select class="countries" v-model="tempSkill" @change="addCountry">
            <option value="" disabled selected>Countries</option>
          <option v-for="country in countriesApi" :key="country">{{ country.name }}</option>
        </select>
        <br>
        <div class="pill" v-for="skill in countries" :key="skill">
          <p @click="removeCountry(skill)">{{ skill }}</p>
        </div>

        <br>
        <br>
        <input class="salary"  v-model="expectedSalary" placeholder="Salary">
      </div>

      <div class="medical-information">
        <h2>Medical Information</h2>
        <hr>
        <br>
        <br>
        <br>
        <input type="text" class="license" placeholder="License" v-model="license">

        <input type="text" class="degree"  v-model="degree" placeholder="Degree">


        <label for="">Qualifications: </label> <span style="font-style: italic;"> Add up to 15 comma separated skills</span>
        <br>
        <input type="text" class="countries" v-model="tempSkill2" @keyup="addSkill" placeholder="Enter your qualifications comma separated..">
            <!-- for v-for to work you must add a key -->
        <div class="pill" v-for="skill in qualifications" :key="skill">
            <p @click="removeSkill(skill)">{{ skill }}</p>
        </div>

        <br>
        <br>
        <label for="">Modalities: *</label>
        <br>
        <select class="countries" v-model="tempSkill3" @change="addSkillModalities">
            <option value="" disabled selected>Add 1 or more</option>
            <option value="plain x-rays">Plain x-rays</option>
            <option value="fluoroscopy">Fluoroscopy</option>
            <option value="nuclear medicine">Nuclear medicine</option>
            <option value="ultrasound">Ultrasound (US)</option>
            <option value="computed tomography">Computed tomography (CT)</option>
            <option value="magnetic resonance imaging">Magnetic resonance imaging (MRI)</option>
            <option value="hybrid modalities">Hybrid e.g. PET-CT, PET-MRI</option>
        </select>
        <div class="pill" v-for="skill in modalities" :key="skill">
            <p @click="removeSkillModalities(skill)">{{ skill }}</p>
        </div>
        <br>
      </div>
      <input type="checkbox" name="" id=""  v-model="terms">
      <label style="color: #737373;" for="">Accept Terms and Conditions</label>

       <div class="submit">
            <button @click="createRadiographer">Create an Account</button>
       </div>
  </div>
</template>

<script>
import RadiographerService from '../RadiographerService'
import CountryService from '../CountryService'

export default {
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            homeAddress: '',
            workAddress: '',
            phoneNumber: '',
            countries: [],
            jobType: '',
            expectedSalary: '',
            license: '',
            degree: '',
            qualifications: [],
            modalities: [],
            terms: false,
            tempSkill: '',
            tempSkill2: '',
            tempSkill3: '',
            passwordError: '',
            countriesApi: this.getCountries()
        }
    },
    methods: {
        addSkill(e) {
            if (e.key === ',' && this.tempSkill2) {
                if (!this.qualifications.includes(this.tempSkill2) && this.qualifications.length < 15) {
                    this.qualifications.push(this.tempSkill2.substring(0, this.tempSkill2.length -1));
                }
                this.tempSkill2 = '';
            }
        },
        addSkillModalities() {
            if (this.tempSkill3) {
                if (!this.modalities.includes(this.tempSkill3)) {
                    this.modalities.push(this.tempSkill3.substring(0, this.tempSkill3.length)); 
                }
                this.tempSkill3 = '';
            }

        },
        addCountry() {
            if (this.tempSkill) {
                if (!this.countries.includes(this.tempSkill)) {
                    this.countries.push(this.tempSkill); 
                }
                this.tempSkill = '';
            }
        },
        removeCountry(skill) {
            this.countries = this.countries.filter((item) => {
                return item !== skill;
            });
        },
        removeSkillModalities(skill) {
            this.modalities = this.modalities.filter((item) => {
                return item !== skill;
            });
        },
        removeSkill(skill) {
            this.qualifications= this.qualifications.filter((item) => {
                return item !== skill;
            });
        },
        async createRadiographer() {
            this.passwordError = this.password.length > 5 ? "" : "Password must be at least 6 characters long";

            // if (!this.passwordError) {
                const post = await RadiographerService.insertRadiographer(this.firstName + " " + this.lastName, this.email, this.password, this.homeAddress, this.workAddress, 
                this.phoneNumber, this.countries, this.jobType, this.expectedSalary, this.license, this.degree, 
                this.qualifications, this.modalities);
                console.log(post);
            // }
            this.radiographers = await RadiographerService.getRadiographers();
        },
        async deleteRadiographer(id) {
          await RadiographerService.deleteRadiographer(id);
          this.radiographers = await RadiographerService.getRadiographers();
        },
        async getCountries() {
            this.countriesApi = await CountryService.getCountries();
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
