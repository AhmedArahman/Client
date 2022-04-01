<template>
  <div class="about">
    <img src="../assets/logo-blue.png" alt="">
    <h1>Register As</h1>
    <button>
      <router-link to="/radiographer">Radiographer</router-link> 
    </button>
    <button>
      <router-link to="/facility">Facility</router-link> 
    </button>
  </div>
</template>

<script>
export default {

}
</script>

<style>
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
  font-size: 3.2em;
}

img {
  padding: 50px 0 0;
}

button {
  font-size: 18px;
  background-color: #F3A953;
  padding: 10px;
  margin: 5px 20px;
  font-family: 'Open Sans', sans-serif;
  animation: fade 500ms ease-in-out forwards;
  border-radius: 5px;
}

button:hover {
  background-color: #FF865E;
  transition: 0.5s;
  transform: translateY(-5px);
}

a {
  text-decoration: none;
  color: white;
}
</style>
