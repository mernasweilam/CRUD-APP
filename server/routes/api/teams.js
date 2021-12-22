const express = require('express');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const auth = require("../../middleware/auth");
//create our router
const router = express.Router();



//Get Teams
router.get('/', auth , async(req, res) => {
    const Teams = await loadTeamsCollection();
    res.send(await Teams.find({}).toArray())
})

//Add Teams
router.post('/', auth,  async(req,res)=>{
    console.log('auth', auth)
    const Teams = await loadTeamsCollection();
    Teams.insertOne({
        name: req.body.name,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });
    res.status(200).send({
        status: 201, 
        message: 'Added Successfully',
    });
})

//Delete Teams
router.delete('/:id', async(req,res)=>{
    const Teams = await loadTeamsCollection();
    await Teams.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send('deleted Successfully');
})

//Update Teams
router.put('/:id', async(req,res)=>{
    const Teams = await loadTeamsCollection();
    const id = {_id: new mongodb.ObjectId(req.params.id)};
    const newValues = {$set: { name: req.body.name , startDate: req.body.startDate, endDate: req.body.endDate}}
    await Teams.updateOne(id, newValues,{})
    res.status(200).send('updated Successfully'); // status Ok
    
})
//connect to the Teams collection DB

async function loadTeamsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cluster0.5hti1.mongodb.net/Cluster0?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('Cluster0').collection('teams');
}

module.exports = router;