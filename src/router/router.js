
import { createWebHistory, createRouter } from "vue-router";
import Team from "../views/Team.vue";
import Employee from "../views/Employee.vue";
import Task from "../views/Task.vue";
import Login from "../views/Login.vue"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/teams",
    name: "Team",
    component: Team,
  },
  {
    path: "/employees",
    name: "Employee",
    component: Employee,
  },
  {
    path: "/tasks",
    name: "Task",
    component: Task,
  }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
