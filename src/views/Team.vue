<template>
  <div>
    <div class="teams">
        <h3>{{viewTitle}}</h3>
        <button type="button" class="btn btn-primary m-2 fload-end" data-bs-toggle="modal" data-bs-target="#teamModal"
          @click="addClick()">
              Add Team
        </button>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Team name</th>
          <th>StartDate</th>
          <th>EndDate</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
      <tbody>
        <tr v-for="team in teams" :key="team._id">
          <td>{{team.name}}</td>
          <td>{{team.startDate}}</td>
          <td v-if="team.endDate">{{team.endDate}}</td>
          <td v-else>Team still exists</td>
          <td><i class="fa fa-pencil" data-bs-toggle="modal" data-bs-target="#teamModal" 
          @click="editClick(team)"></i></td>
          <td><i class="fa fa-trash" @click="deleteTeam(team._id)"></i></td>
      </tr>
      </tbody>
    </table>
    <div class="modal fade" id="teamModal" tabindex="-1" role="dialog" aria-labelledby="teamModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="teamModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
      </div>
      <div class="modal-content">
        <div class="input-group mb-3">
            <span class="input-group-text">Team Name</span>
            <input type="text" class="form-control" v-model="name"/>
        </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Team Start Date</span>
            <input type="date" class="form-control" v-model="startDate"/>
          </div>
            <div class="input-group mb-3">
            <span class="input-group-text">Team End Date</span>
            <input type="date" class="form-control" v-model="endDate"/>
          </div>
        <button type="button" v-if="teamId==0" class="btn btn-primary" @click="createTeam">Create</button>
        <button type="button" v-if="teamId!=0" class="btn btn-primary" @click="updateTeam(teamId)">Update</button>

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
  name: 'Team',
  props: {
  },
  components: {
  },
    data(){
      return{
          teams: [],
          viewTitle: 'Team Management',
          name: '',
          teamId: 0,
          startDate: '',
          endDate: '',
          modalTitle: ''
      }
  },

  methods:{
    //return teams
    getAllTeams(){
      crudAxios.get(`http://localhost:5000/api/teams`).then(data =>{
        this.teams = data.data
      })
    },
    //add new team
    addClick(){
      console.log('clicked popup')
      this.modalTitle= 'Add Team';
      this.teamId = 0;
      this.name = '';
      this.startDate = '',
      this.endDate = ''
    },
    //edit existing team
    editClick(team){
      console.log('teammmm', team)
      this.modalTitle= 'Edit Team';
      this.teamId = team._id;
      this.name = team.name;
      this.startDate = team.startDate;
      this.endDate = team.endDate;
    },
    //CREATE new team
    createTeam(){
      crudAxios.post(`http://localhost:5000/api/teams`, { 
          name: this.name,
          startDate: this.startDate,
          endDate: this.endDate
          })
      .then((data)=>{
        this.getAllTeams();
        alert(data.data);
      })
    },
    //UPDATE EXISTING TEAM
    updateTeam(id){
      console.log('team id', id)
      crudAxios.put(`http://localhost:5000/api/teams/${id}`, { 
          name: this.name,
          startDate: this.startDate,
          endDate: this.endDate
          })
      .then((data)=>{
        this.getAllTeams();
       alert(data.data);
      })
    },

    //delete team
    deleteTeam(id){
      if(!confirm('Are you sure?')){
        return;
      }
      crudAxios.delete(`http://localhost:5000/api/teams/${id}`)
      .then(data =>{
         this.getAllTeams();
          alert(data.data);
      })
      
    }
  },
  mounted(){
    this.getAllTeams();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.teams{
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
