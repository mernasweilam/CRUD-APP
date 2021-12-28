<template>
  <div class="search-result">
      <SearchComponent @searchActivated="fetchSearchResult"/>
    <div class="content" v-if="employees.length">
       <!-- <Employee v-for="employee in employees" :key="employee.id"/> -->
        <table class="table table-striped">
            <thead>
            <tr>
                <!-- <th>Employee code</th> -->
                <th>Employee name</th>
                <th>Join Date</th>
                <th>Skills</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" :key="employee._id">
                    <td>{{employee.name}}</td>
                    <td>{{employee.joinDate}}</td>
                    <td>
                        <ul v-for="skill in employee.skills" :key="skill">
                            <li>{{skill}}</li>
                        </ul>
                    </td>  
                </tr>
            </tbody>
        </table>
    </div>
    <div class="content" v-if="tasks.length">
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
    <div class="content" v-if="teams.length">
        <table class="table table-striped" >
            <thead>
            <tr>
            <th>Team name</th>
            <th>StartDate</th>
            <th>EndDate</th>
            </tr>
            </thead>
        <tbody>
            <tr v-for="team in teams" :key="team._id">
            <td>{{team.name}}</td>
            <td>{{team.startDate}}</td>
            <td v-if="team.endDate">{{team.endDate}}</td>
            <td v-else>Team still exists</td>
        </tr>
        </tbody>
        </table>
    </div>
  </div>
</template>
<style>
</style>
<script>
import crudAxios from '../core/crudAxios'
import axios from 'axios';
import SearchComponent from '../components/SearchComponent.vue'
export default {
  name: "SearchResult",
  components: {
    SearchComponent
  },
  
  data(){
      return{
           tasks: [],
            employees: [],
            teams: [],
          disable: false,
      }
  },

  methods: {
    //fetch search result when user initially search for any query
    fetchSearchResult(q){
        let employeesRequest = 'http://localhost:5000/api/employees'
        let tasksRequest = 'http://localhost:5000/api/tasks'
        let teamsRequest = 'http://localhost:5000/api/teams'
      this.$router.push({ query: { query: encodeURIComponent(q)}});
        axios.all([employeesRequest, tasksRequest, teamsRequest]).then(axios.spread((...responses) => {
            const employeesResponse= responses[0]
            const tasksResponse= responses[1]
            const teamsResponse= responses[2]
            //employees
           crudAxios.get(employeesResponse) 
            .then(data => {
                const searchedEmployees = data.data.filter( emp => {
                    return emp.name.toLowerCase() === q
                });  
            this.employees = searchedEmployees
            })
            //tasks
           crudAxios.get(tasksResponse) 
            .then(data => {
                const searchedTasks= data.data.filter( task => {
                    return task.taskName.toLowerCase() === q || task.taskName.includes(q) || task.taskDesc.includes(q)
                });   
            this.tasks= searchedTasks

            })
            //teams
           crudAxios.get(teamsResponse) 
            .then(data => {
                const searchedTeams = data.data.filter( team => {
                    return team.name.toLowerCase() === q || team.name.includes(q)
                });   
            this.teams= searchedTeams

            })
        }))
    }

  },
  created() {
    if(this.$route.query.query) {
      this.t(this.$route.query.query)
    }
  }
}
</script>
