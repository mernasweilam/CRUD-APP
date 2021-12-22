const express = require('express');
const mongodb = require('mongodb');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const TOKEN_KEY = 'yfgjhkjefhdabsknjdmkl,'

//create our router
const router = express.Router();

router.get('/', async(req, res) => {
    const Users = await loadUsersCollection();
    res.send(await Users.find({}).toArray())
})


router.post('/login', async(req,res) => {
        try {
            // Get user input
            const { username , password } = req.body
        
            // Validate user input
            if (!(username && password)) {
              res.status(400).send("All input is required");
            }
            // Validate if user exist in our database
            const Users = await loadUsersCollection();
            const user = await Users.findOne({
                username: req.body.username,
                password: req.body.password,
            });
        
            if (user) {
              // Create token
              const token = jwt.sign({id: user._id,
                username: user.username 
            }, TOKEN_KEY,
            {
              expiresIn: "2h",
            })
        
              // save user token
              user.token = token;
              // user
              res.status(200).json(user);
            }
            res.status(400).send("Invalid Credentials");
          } catch (err) {
            console.log(err);
          }
          // Our register logic ends here  
})

router.post('/register', async(req,res)=>{
  try {
    // Get user input
    const { username , password} = req.body;

    // Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const Users = await loadUsersCollection();
    const oldUser = await Users.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
   const user = await Users.insertOne({
        username: req.body.username,
        password: req.body.password,

    });
    // Create token
    const token = jwt.sign({id: user._id,
        username: user.username 
    },  TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
})





//connect to the Teams collection DB

async function loadUsersCollection(){
    const client = await mongodb.MongoClient.connect('mongodb+srv://admin:admin@cluster0.5hti1.mongodb.net/Cluster0?retryWrites=true&w=majority',{
        useNewUrlParser: true
    });
    return client.db('Cluster0').collection('users');
}

module.exports = router;