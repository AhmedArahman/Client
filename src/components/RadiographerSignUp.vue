<template>
  <form>
      <h2>Register as radiographer</h2>
      <label>Name:</label>
      <input type="text" name="name" id="name"  v-model="name">

      <label>Email:</label>
      <input type="email" name="email" id="email"  v-model="email">

      <label>Password:</label>
      <input type="password" name="password" id="password"  v-model="password">
      <div v-if="passwordError" class="error"> {{ passwordError }} </div>

      <label>Home Address:</label>
      <input type="text" name="homeAddress" id="homeAddress"  v-model="homeAddress">

      <label>Work Address:</label>
      <input type="text" name="workAddress" id="workAddress"  v-model="workAddress">

      <label>Phone Number:</label>
      <input type="number" name="phoneNumber" id="phoneNumber"  v-model="phoneNumber">

      <!-- Input of countries API goes here -->
      <!-- Can select multiple -->
      <label for="">Where can you work?</label>
      <select name="countries" id="countries" v-model="countries">
          <!-- <option value="Web Developer">Web Developer</option>
          <option value="Web Designer">Web Designer</option> -->
      </select>

      <label for="">Job Type:</label>
      <select name="jobType" id="jobType" v-model="jobType">
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
      </select>

      <label>Expected Salary:</label>
      <input type="number" name="expectedSalary" id="expectedSalary"  v-model="expectedSalary">

      <label>License:</label>
      <input type="text" name="license" id="license"  v-model="license">

      <label>Degree:</label>
      <input type="text" name="degree" id="degree"  v-model="degree">

      <label for="">Qualifications:</label>
      <input type="text" name="qualifications" id="qualifications" v-model="tempSkill" @keyup="addSkill" placeholder="Enter your qualifications comma separated..">
        <!-- for v-for to work you must add a key -->
      <div class="pill" v-for="skill in qualifications" :key="skill">
          <p @click="removeSkill(skill)">{{ skill }}</p>
      </div>

      <br>

      <label for="">Modalities:</label>
      <select name="modalities" id="modalities" v-model="modalities">
          <option value="plain x-rays">Plain x-rays</option>
          <option value="fluoroscopy">Fluoroscopy</option>
          <option value="nuclear medicine">Nuclear medicine</option>
          <option value="ultrasound">Ultrasound (US)</option>
          <option value="computed tomography">Computed tomography (CT)</option>
          <option value="magnetic resonance imaging">Magnetic resonance imaging (MRI)</option>
          <option value="hybrid modalities">Hybrid e.g. PET-CT, PET-MRI</option>
      </select>

      <br>

      <input type="checkbox" name="" id=""  v-model="terms">
      <label for="">Accept Terms and Conditions</label>

      <div class="submit">
          <button @click="createRadiographer">Create an Account</button>
      </div>
  </form>
</template>

<script>
import RadiographerService from '../RadiographerService'

export default {
    data() {
        return {
            name: '',
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
            passwordError: ''
        }
    },
    methods: {
        addSkill(e) {
            if (e.key === ',' && this.tempSkill) {
                if (!this.qualifications.includes(this.tempSkill)) {
                    this.qualifications.push(this.tempSkill.substring(0, this.tempSkill.length -1));
                }
                this.tempSkill = '';
            }
        },
        removeSkill(skill) {
            this.qualifications= this.qualifications.filter((item) => {
                return item !== skill;
            });
        },
        async createRadiographer() {
          await RadiographerService.insertRadiographer(this.name, this.email, this.password, this.homeAddress, this.workAddress, 
            this.phoneNumber, this.countries, this.jobType, this.expectedSalary, this.license, this.degree, 
            this.qualifications, this.modalities);
          // this.radiographers = await RadiographerService.getRadiographers();
        },
        async deleteRadiographer(id) {
          await RadiographerService.deleteRadiographer(id);
          // this.radiographers = await RadiographerService.getRadiographers();
        }
    }
}
</script>


<style scoped>
    form {
        max-width: 420px;
        margin: 50px auto 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
        background: #000;
    }
    h2 {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        color: white;
    }
    label {
        color: #F10086;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.7em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input, select {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #AAAAAA;
        color: black;
        background: #F4F9F9;
        font-size: 1em;
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
        color: #777;
        cursor: pointer;
    }
    .submit {
        text-align: center;
    }
    button {
        background: #F10086;
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
