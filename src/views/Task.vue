<template>
  <div>
    <div class="tasks">
        <h3>Tasks</h3>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Task code</th>
          <th>task Name</th>
          <th>Task Description</th>
          <th>Employee Code</th>
          <th>Logged Time</th>
          <th>Start Date</th>
        </tr>
        </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task._id">
            <td>{{task.taskCode}}</td>
            <td>{{task.taskName}}</td>
            <td>{{task.taskDesc}}</td>
            <td>{{task.logs.code}}</td>
             <td>{{loggedTime}}</td>
              <td>{{task.logs.startDate}}</td>
        </tr>
      </tbody>
    </table>

    </div>
  </div>
</template>

<script>
import crudAxios from '../core/crudAxios'
export default {
  name: 'Tasks',
  props: {
  },
  components: {
  },
    data(){
      return{
          tasks: [],
          loggedTimeInSec:''
      }
  },

  methods:{
    //return tasks
    getAllTasks(){
      crudAxios.get(`http://localhost:5000/api/tasks`).then(data =>{
        this.tasks = data.data
        
        this.tasks.forEach(element => 
        console.log('element', element.logs.loggedTime,
        this.loggedTimeInSec = element.logs.loggedTime))
      })
    }
  },
  mounted(){
    this.getAllTasks();
  },
   computed: {
    // a computed getter
    loggedTime: function () {
       const time = this.loggedTimeInSec.slice(-1);
       const timeValue = this.loggedTimeInSec.slice(0,-1);
       if( time == 'h'){
            var milliseconds = timeValue * 60 * 60 *1000;
       }
       else if( time == 'm'){
            milliseconds = timeValue * 60 * 1000;
       }
        return milliseconds
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tasks{
    padding: 20px;
}
.fa{
    cursor: pointer;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

</style>
