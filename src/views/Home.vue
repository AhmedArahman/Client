<template>
  <div class="home">
    <Navbar />
    <RadiographerSignUp />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import RadiographerSignUp from '@/components/RadiographerSignUp.vue'

export default {
  name: 'Home',
  components: {
    RadiographerSignUp,
    Navbar
  }
}
</script>

<style scoped>
div.home {
    /* The image used */
  background: #1e1e1e;

  /* Full height */
  height: 100%;
  padding-bottom: 30px;

  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
