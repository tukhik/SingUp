const mongoose=require("mongoose")

const db ='mongodb+srv://todo-user:Nikas2023@cluster0.25kms.mongodb.net/users-data?retryWrites=true&w=majority'
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  console.log('mongoose connected');
})
.catch((e)=>{
  console.log('failed');
})

const usersSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

const UsersCollection=new mongoose.model('Users', usersSchema)

module.exports=UsersCollection