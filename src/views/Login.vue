<template>
   <div>
      <div class="login-page" v-if="!registerActive">
         <div class="container">
            <div class="row">
               <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                  <div class="card login" v-bind:class="{ error: emptyFields }">
                        <h1>Sign In</h1>
                        <form class="form-group" @submit.prevent="doLogin">
                           <input v-model="username" type="text" class="form-control" placeholder="username" required>
                           <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                           <input type="submit" class="btn btn-primary">
                           <p>Don't have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Create a new account</a>
                           </p>
                        </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <div class="register-page" v-else>
         <div class="container">
            <div class="row">
               <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
                  <div class="card register" v-bind:class="{ error: emptyFields }">
                     <h1>Sign Up</h1>
                     <form class="form-group" @submit.prevent="doRegister">
                        <input v-model="username" type="text" class="form-control" placeholder="Username" required>
                        <input v-model="password" type="password" class="form-control" placeholder="Password" required>
                        <!-- <input v-model="confirmReg" type="password" class="form-control" placeholder="Confirm Password" required> -->
                        <input type="submit" class="btn btn-primary">
                        <p>Already have an account? <a href="#" @click="registerActive = !registerActive, emptyFields = false">Sign in here</a>
                        </p>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
      </div>

</template>
<script>
import crudAxios from '../core/crudAxios'
export default {
  name: 'Login',
  props: {
  },
  components: {
  },
    data(){
      return{
        registerActive: false,
        username: "",
        password: "",
        emptyFields: false,
          
      }
  },

  methods:{
      doLogin() {
         if (this.username === "" || this.password === "") {
            this.emptyFields = true;
         } else {
            crudAxios.post(`http://localhost:5000/api/users/login`, { 
            username: this.username,
            password: this.password,
          })
            .then( data =>{
            console.log('data', data) 
            console.log('token', data.data.token)
            localStorage.setItem('token', data.data.token)

            if(data.data.token){
               this.loggedIn = true;
              window.location.href ='/teams'
               console.log('token', data.data.token)
            }
            else{
               this.$router.push('/login')
            }
            })
         }
        
      },
      doRegister() {
         if (this.username === "" || this.password === "") {
            this.emptyFields = true;
         } else {
           crudAxios.post(`http://localhost:5000/api/users/register`, { 
            username: this.username,
            password: this.password,
          })
            .then((data)=>{
            console.log('data', data)
               this.registerActive = false
               this.username = ''
               this.password = ''
            })
         }
      }

  }
}
</script>
<style scoped>
   
 p {
   line-height: 1rem;
}

.card {
   padding: 20px;
}

.form-group input{
    margin-bottom: 20px;
}
.login-page , .register-page {
   align-items: center;
   display: flex;
   height: 100vh;
}
</style>