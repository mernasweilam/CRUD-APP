<template>
   
   <div class="search"> 
        <input type="text" placeholder="Search" v-model="query" @keyup.enter="submitSearch"/>
        <button class="search-btn" @click="submitSearch">
          <i class="fa fa-search"></i>
        </button>
      </div>
</template>
<script>
import _ from 'lodash';
export default {
  name: 'SearchComponent',
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
