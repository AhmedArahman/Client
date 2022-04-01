<template>
  <div class="home">
    <nav>
      <button>
        <router-link to="/">Home</router-link> 
      </button>
    </nav>
    <img src="../assets/logo-blue.png" alt="">
    <h1>Radiographer Registration</h1>
    <RadiographerSignUp />
  </div>
</template>

<script>
// @ is an alias to /src
// import Navbar from '@/components/Navbar.vue'
import RadiographerSignUp from '@/components/RadiographerSignUp.vue'

export default {
  name: 'Home',
  components: {
    RadiographerSignUp,
    // Navbar
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
div.home {
    /* The image used */
  background: #D3E0EA;

  /* Full height */
  height: 100%;
}

h1 {
  font-family: 'Open Sans', sans-serif;
  color: #737373;
}

img {
  padding: 50px 0 0;
}

button {
  font-size: 18px;
  background-color: #F3A953;
  padding: 10px;
  margin: 20px 20px 0;
  font-family: 'Open Sans', sans-serif;
  animation: fade 500ms ease-in-out forwards;
  border-radius: 5px;
}

button:hover {
  background-color: #FF865E;
  transition: 0.5s;
  transform: translateY(-5px);
}
</style>
