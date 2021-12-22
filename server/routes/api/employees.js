const express = require('express');
const mongodb = require('mongodb');

//create our router
const router = express.Router();

//Get Employees
router.get('/', async(req, res) => {
    const Employees = await loadEmployeesCollection();
   console.log('hello', req)
    res.send(await Employees.find({}).toArray())
})

//Add Employees
router.post('/', async(req,res)=>{
    const Employees = await loadEmployeesCollection();
    console.log('req', req)
    await Employees.insertOne({
        code: req.body.code,
        name: req.body.name,
        joinDate: req.body.joinDate,
        skills: req.body.skills
    });
    res.status(201).send('Added Successfully'); // means something new is created
})

//Delete Employees
router.delete('/:id', async(req,res)=>{
    const Employees = await loadEmployeesCollection();
    await Employees.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send('deleted Successfully');
})

//Update Employees
router.put('/:id', async(req,res)=>{
    const Employees = await loadEmployeesCollection();
    const id = {_id: new mongodb.ObjectId(req.params.id)};
    const newValues = {$set: { code: req.body.code, name: req.body.name , joinDate: req.body.joinDate, skills: req.body.skills}}
    await Employees.updateOne(id, newValues,{})
    res.status(200).send('updated Successfully'); // status Ok
})

//connect to the Employees collection DB

async function loadEmployeesCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cluster0.5hti1.mongodb.net/Cluster0?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('Cluster0').collection('employees');
}

module.exports = router;