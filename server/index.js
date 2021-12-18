const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');
app.use('/api/posts', posts)

const port = process.env.port || 5000 //to be changed to only 5000


//to start the server

app.listen(port , () => console.log(`Server started on port ${port}`))
