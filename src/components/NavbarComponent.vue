<template>
<div>
    <nav class="navbar navbar-expand-sm bg-light navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item m-1">
        <router-link class="btn btn-light btn-outline-primary" to="/teams">Teams</router-link>
      </li>
       <li class="nav-item m-1">
        <router-link class="btn btn-light btn-outline-primary" to="/employees">Employees</router-link>
      </li>
       <li class="nav-item m-1 ">
        <router-link class="btn btn-light btn-outline-primary" to="/tasks">tasks</router-link>
      </li>
    </ul>
  </nav>
  <a href="/search">Go to Search Page</a>
</div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'NavbarComponent',
  props: {
  },
  components: {
   
  },
    data(){
      return{
         query: '',
          isTyping: false
      }
     
  },
   watch: {
    query: _.debounce(function() {
      this.isTyping = false;
    }, 1000),
    isTyping: function(value) {
      if (!value) {
        this.submitSearch(this.query);
      }
    }
  },
  methods:{
     submitSearch(){
      this.$emit('searchActivated', this.query);
    }
  }
}
</script>
