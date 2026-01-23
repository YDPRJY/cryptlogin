const express=require('express')
const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const app=express()
app.use(express.json());
app.use(express.urlencoded());

let b=mongoose.connect('mongodb://127.0.0.1:27017/cryptex')
 
 b.then((data)=>{console.log('sucesss')})
 b.catch((error)=>{console.log('errror')})
 const dpschema= new mongoose.Schema({    
    user: String,
    pass:String     
  },
 {versionKey:false} )

//const Post = mongoose.model("cselogin", dpschema,"cryptpass");

app.get('/demo',(req,res)=>{    
    Post.find().then(posts => {
    res.send(posts)
 })
})
  
const Post = mongoose.model("cselogin", dpschema,"cryptpass");

app.post('/info', async (req, res) => {
    const { user, pass } = req.body;  
    try {
      const hashedPassword = await bcrypt.hash(pass, 10);  
      const newUser = new Post({ user, pass: hashedPassword });
      await newUser.save();  
      res.status(201).send('User registered successfully in website');
    } 
    catch (error) 
    {
      console.error(error);
      res.status(500).send('An error occurred from cse');
    }
  }); 
  
  app.post('/login', async (req, res) => {
    const { user, pass } = req.body;  
    try {
      const user1 = await Post.findOne({ user });  
      if (!user1) {
        return res.status(404).send('User not found');
      }  
      const passwordMatch = await bcrypt.compare(pass, user1.pass);
      if (passwordMatch) {
        res.send('Login successful');
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  });  
  var server=app.listen(4000,()=>{
    console.log("SERVER")
})

 