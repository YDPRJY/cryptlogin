const express=require('express')
const mongoose=require('mongoose')
const app=express()
app.use(express.json());
app.use(express.urlencoded());
let b=mongoose.connect('mongodb://127.0.0.1:27017/cryptex')
 
 b.then((data)=>{console.log('sucesss')})
 b.catch((error)=>{console.log('errror')})
 const dpschema= new mongoose.Schema({    
    user: {
      type: String,
      unique:true,
      "minLength": 5,
      "maxLength":8,
      required: [true, "fullname not provided. Cannot create user without fullname "],
      
  },
  pass: {
    type: String,
    "minLength": 6,        
    required: [true, "PAssword not provided."],
   
       } 
      },{versionKey:false}
      )

      const Post = mongoose.model("cselogin", dpschema,"cryptcse");

app.get('/demo',(req,res)=>{
    
    Post.find().then(posts => {
    res.send(posts)
 })
})
app.post('/info',async (req,res)=>{
   var data={
     user:req.body.user,
      pass:req.body.pass
    }
   const mai=new Post(data)
   mai.save().then(info=>{
      res.json(info)
   }).catch((err)=>{console.log(err)

   })
 })

 app.put('/:id',(req,res)=>{
   var data={
      name:req.body.name,
       mob:req.body.mobile
     }
     Post.findByIdAndUpdate(req.params.id,{$set:req.body}).then((data1)=>{
      console.log('jdjsbvj')
     })
 })
 var server=app.listen(4000,()=>{
    console.log("SERVER")
})