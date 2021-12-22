const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());
const users = require('./routes/api/users');
const teams = require('./routes/api/teams');
const employees = require('./routes/api/employees');

app.use('/api/users', users)
app.use('/api/teams', teams)
app.use('/api/employees', employees)


const port = process.env.port || 5000 //to be changed to only 5000
//to start the server

app.listen(port , () => console.log(`Server started on port ${port}`))
