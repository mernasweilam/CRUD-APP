import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import 'jquery/dist/jquery.min.js'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"



createApp(App).use(router).mount('#app')

