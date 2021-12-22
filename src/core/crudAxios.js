import axios from 'axios';
let crudAxios = axios.create({});
const token = localStorage.getItem('token')
console.log('tokeeennnnnnnn', token)
crudAxios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
crudAxios.defaults.headers.post['Content-Type'] = 'application/json';
export default crudAxios;