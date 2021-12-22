<template>
<div class="home">
  <h3 class="d-flex justify-content-center">Vue Js FullStack</h3>
  <h5 class="d-flex justify-content-center">Corporate Management Portal</h5>
  <div v-if="isLoggedIn">
    <NavbarComponent></NavbarComponent>
  </div>
  <div v-else>
    <Login></Login>
  </div>
  <router-view></router-view>
  </div>
</template>

<script>
import NavbarComponent from './components/NavbarComponent.vue';
import Login from './views/Login.vue'
export default {
  name: 'App',
  components: {
    NavbarComponent,
    Login
    // Login
    // LoginComponent
  }, 
  data(){
    return{
      isLoggedIn: false
    }
  },
  mounted(){
    const token = localStorage.getItem('token');
    if(token){
        this.isLoggedIn = true;
    }
  }
}
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
