const express = require('express');
const mongodb = require('mongodb');

//create our router
const router = express.Router();

//Get Posts
router.get('/', async(req, res) => {
    // res.send('hello');
    const Posts = await loadPostsCollection();
    res.send(await Posts.find({}).toArray())
})

//Add Posts
router.post('/', async(req,res)=>{
    const Posts = await loadPostsCollection();
    await Posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send(); // means something new is created
})

//Delete Posts
router.delete('/:id', async(req,res)=>{
    const Posts = await loadPostsCollection();
    await Posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)});
    res.status(200).send();
})

//Update Posts
router.put('/:id', async(req,res)=>{
    const Posts = await loadPostsCollection();
    const id = { _id: new mongodb.ObjectId(req.params.id)};
    const newValues = {$set: { text: req.body.text , updatedAt: new Date()}}
    await Posts.updateOne(id, newValues,{})
    res.status(200).send(); // status Ok
    
})

//connect to the Posts collection DB

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cluster0.5hti1.mongodb.net/Cluster0?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('Cluster0').collection('posts');
}

module.exports = router;