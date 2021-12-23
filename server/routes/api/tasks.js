const express = require('express');
const mongodb = require('mongodb');
const auth = require("../../middleware/auth");
//create our router
const router = express.Router();

//Get Tasks
router.get('/', auth, async(req, res) => {
    const Tasks = await loadTasksCollection();
    res.send(await Tasks.find({}).toArray())
})

//Add Tasks
router.post('/', auth, async(req,res)=>{
    const Tasks = await loadTasksCollection();
    await Tasks.insertOne({
        taskCode: req.body.taskCode,
        taskName: req.body.taskName,
        taskDesc: req.body.taskDesc,
        logs: req.body.logs,
    });
    res.status(201).send('task created Successfully'); // means something new is created
})

//connect to the Tasks collection DB

async function loadTasksCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cluster0.5hti1.mongodb.net/Cluster0?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('Cluster0').collection('tasks');
}

module.exports = router;