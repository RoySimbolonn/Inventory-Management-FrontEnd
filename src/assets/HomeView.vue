<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MainNavbar msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainNavbar from '@/components/MainNav.vue'

export default {
  name: 'HomeView',
  components: {
    MainNavbar // Ubah nama komponen di sini
  }
}
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>