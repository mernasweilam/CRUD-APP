<template>
  <div>
    <div class="employees">
      <h3>{{viewTitle}}</h3>
      <button type="button" class="btn btn-primary m-2 fload-end" data-bs-toggle="modal" data-bs-target="#employeeModal"
       @click="addClick()">
            Add Employee
      </button>
    <table class="table table-striped">
      <thead>
      <tr>
        <th>Employee code</th>
        <th>Employee name</th>
        <th>Join Date</th>
        <th>Skills</th>
         <th>Team</th>
        <th>Edit</th>
        <th>Delete</th>
        <th>Tasks</th>
      </tr>
      </thead>
    <tbody>
      <tr v-for="employee in employees" :key="employee._id">
        <td>{{employee.code}}</td>
        <td>{{employee.name}}</td>
        <td>{{employee.joinDate}}</td>
        <td>
            <ul v-for="skill in employee.skills" :key="skill">
                <li>{{skill}}</li>
            </ul>
        </td>
          <td>{{employee.teams}}</td>
        <td><i class="fa fa-pencil" data-bs-toggle="modal" data-bs-target="#employeeModal" 
        @click="editClick(employee)"></i></td>
        <td><i class="fa fa-trash" @click="deleteEmployee(employee._id)"></i></td>
        <!-- Add Task -->
        <td> 
          <button type="button" class="btn btn-primary m-2 fload-end" data-bs-toggle="modal" data-bs-target="#taskModal"
                @click="addTask(employee)">
                  Add Task
          </button>
        </td>
    </tr>
    </tbody>
</table>
  <!-- add employee modal-->
  <div class="modal fade" id="employeeModal" tabindex="-1" role="dialog" aria-labelledby="employeeModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="employeeModalLabel">{{modalTitle}}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
      </div>
      <div class="modal-content">
        <div class="input-group mb-3">
              <span class="input-group-text">Employee team</span>
              <div class="dropdown" @click="showTeamDropdown">
                  <select class="c-form-input">
                      <option value="">Please Select Your team</option>
                  </select>
              </div>
              <div class="multiselect">
                  <ul v-if="showTeam">
                      <li v-for="(team, index) in teams" :key="index">
                          <input type="radio" :id="index" :value="team" v-model="selectedTeam" name="teams">
                          <label :for="index">{{ team }}</label>
                      </li>
                  </ul>
              </div>
            
          </div>
          
            <!-- <ul class="col" v-if="selectedTeam.length">
                <li v-for="item in teams" :key="item">{{ item }}</li>
            </ul> -->
              <div class="col" v-if="selectedTeam.length">
                <span>{{ selectedTeam }}</span>
            </div>

        <div class="input-group mb-3">
            <span class="input-group-text">Employee code</span>
            <input type="number" class="form-control" v-model="code"/>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Employee Name</span>
            <input type="text" class="form-control" v-model="name"/>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Employee JoinDate</span>
            <input type="date" class="form-control" v-model="joinDate"/>
        </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Employee skills</span>
              <div class="dropdown" @click="showDropdown">
                  <select class="c-form-input">
                      <option value="">Please Select Your Skills</option>
                  </select>
              </div>
              <div class="multiselect">
                  <ul v-if="show" >
                      <li v-for="(skill, index) in basicSkills" :key="index">
                          <input type="checkbox" :id="index" :value="skill" v-model="skills">
                          <label :for="index">{{ skill }}</label>
                      </li>
                  </ul>
              </div>
          </div>
          
            <ul class="col" v-if="skills.length">
                <li v-for="item in skills" :key="item">{{ item }}</li>
            </ul>
        <button type="button" v-if="employeeId==0" class="btn btn-primary" @click="createEmployee">Create</button>
        <button type="button" v-if="employeeId!=0" class="btn btn-primary" @click="updateEmployee(employeeId)">Update</button>

      </div>
    </div>
  </div>

  </div>
 <!-- add task modal-->
  <div class="modal fade" id="taskModal" tabindex="-1" role="dialog" aria-labelledby="TaskModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title" id="TaskModalLabel">Add Task</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"
        aria-label="Close"></button>
      </div>
      <div class="modal-content">
        <div class="input-group mb-3">
            <span class="input-group-text">Task code</span>
            <input type="number" class="form-control" v-model="taskCode"/>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Task Name</span>
            <input type="text" class="form-control" v-model="taskName"/>
        </div>
        <div class="input-group mb-3">
            <span class="input-group-text">Task Description</span>
            <input type="text" class="form-control" v-model="taskDesc"/>
        </div>
            <div class="input-group mb-3">
              <p>Employee logs</p>
                <ul>
                  <li>
                     <div class="input-group mb-3">
                        <span class="input-group-text">Employee team</span>
                        <div class="dropdown" @click="showTeamDropdown">
                            <select class="c-form-input">
                                <option value="">Please Select Your team</option>
                            </select>
                        </div>
                        <div class="multiselect">
                            <ul v-if="showTeam">
                                <li v-for="(team, index) in teams" :key="index">
                                    <input type="radio" :id="index" :value="team" v-model="selectedTeam" name="teams">
                                    <label :for="index">{{ team }}</label>
                                </li>
                            </ul>
                        </div>
            
                    </div>
          
                <div class="col" v-if="selectedTeam.length">
                    <span v-for="item in selectedTeam" :key="item">{{ item }}</span>
                </div>
                     <div class="input-group mb-3">
                      <span class="input-group-text">Employee Code</span>
                      <input type="text" class="form-control" v-model="logs.code" readonly/>
                    </div>
                  </li>
                   <li>
                     <div class="input-group mb-3">
                      <span class="input-group-text">Employee loggedTime</span>
                      <input type="text" class="form-control" v-model="logs.loggedTime"/>
                    </div>
                  </li>
                   <li>
                     <div class="input-group mb-3">
                      <span class="input-group-text">logStartDate</span>
                      <input type="date" class="form-control" v-model="logs.startDate"/>
                    </div>
                  </li>
                </ul>
             
            
          </div>
          
        <button type="button" class="btn btn-primary" @click="createTask">Create Task</button>
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
  name: 'Employee',
  props: {
  },
  components: {
  },
    data(){
      return{
          employees: [],
          viewTitle: 'Employee Management',
          code: Number,
          name: '',
          employeeId: 0,
          joinDate: Date,
          basicSkills:['reading','writing','work hard', 'play music', 'shopping'],
          skills:[],
          modalTitle: '',
          show: false,
          showTeam: false,
          taskCode: Number,
          taskName: '',
          taskDesc:'',
          logs: [{
            code: '',
            loggedTime : '',
            startDate:''
          }],
          teams: [],
          selectedTeam: [],
          editModal: false
      }
  },

  methods:{
      showDropdown() {
      this.show = !this.show
    },
     showTeamDropdown() {
      this.showTeam = !this.showTeam
    },
    //return employees
    getAllEmployees(){
      crudAxios.get(`http://localhost:5000/api/employees`).then(data =>{
        this.employees = data.data
      })
    },
    //return teams
    getAllTeams(){
      crudAxios.get(`http://localhost:5000/api/teams`).then(data =>{
        const filteredTeams = data.data.map(team => {
        return team.name
      })
        this.teams = filteredTeams
      })
      
    },
    //add new employee
    addClick(){
      this.modalTitle= 'Add Employee';
      this.employeeId = 0;
      this.name = '';
      this.code = '';
      this.joinDate = '';
      this.skills = [];
      // this.teams = []
    },
    addTask(employee){
      this.logs.code = employee.code
    },
    //edit existing employee
    editClick(employee){
      this.editModal = true;
      this.modalTitle= 'Edit Employee';
      this.employeeId = employee._id;
      this.code = employee.code;
      this.name = employee.name;
      this.joinDate = employee.joinDate;
      this.skills = employee.skills;
      // this.teams = this.teams;
    },
    //CREATE new employee
    createEmployee(){
      crudAxios.post(`http://localhost:5000/api/employees`, { 
          code: this.code,
          name: this.name,
          joinDate: this.joinDate,
          skills: this.skills,
          teams: this.selectedTeam
          })
      .then((data)=>{
        this.getAllEmployees();
        alert(data.data);
      })
    },
    //UPDATE EXISTING Employee
    updateEmployee(id){
      crudAxios.put(`http://localhost:5000/api/employees/${id}`, { 
          code: this.code,
          name: this.name,
          joinDate: this.joinDate,
          skills: this.skills,
          teams: this.selectedTeam
          })
      .then((data)=>{
        this.getAllEmployees();
       alert(data.data);
      })
    },

    //delete employee
    deleteEmployee(id){
      if(!confirm('Are you sure?')){
        return;
      }
      crudAxios.delete(`http://localhost:5000/api/employees/${id}`)
      .then(data =>{
         this.getAllEmployees();
          alert(data.data);
      })
      
    },
        //CREATE new task
    createTask(){
      crudAxios.post(`http://localhost:5000/api/tasks`, { 
        taskCode: this.taskCode,
        taskName: this.taskName,
        taskDesc: this.taskDesc,
        logs: {
          code: this.logs.code,
          loggedTime: this.logs.loggedTime,
          startDate: this.logs.startDate
        }
          })
         
      .then((data)=>{
        console.log('data', data)
         alert('task added');
      })
    },
  },
  mounted(){
      this.getAllEmployees();
      this.getAllTeams();
  },
  updated(){
    console.log('selectedTeam', this.selectedTeam)
  },
  computed(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.employees{
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
.dropdown { 
  position: relative; 
  cursor: pointer;
}

.multiselect {
  /* position: relative; */
  width: 100%;
  position: absolute;
  top: 50px;
  height: auto;
  z-index: 999;
}
.multiselect  ul{
    border: 1px solid #ddd;
    border-top: 0;
    border-radius: 0 0 3px 3px;
    left: 0px;
    padding: 8px 8px;
    position: absolute;
    top: -1rem;
    width: 100%;
    list-style: none;
    max-height: 150px;
    overflow: auto;
    display: flex;
    flex-direction: row;
    background: #fff;
}

.overselect {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
