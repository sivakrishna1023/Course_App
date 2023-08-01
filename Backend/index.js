const express= require('express');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
app.use(cors());
app.use(express.json());
const admin=require('./Servers/admin');
const users=require('./Servers/users')
app.use('/admin',admin);
app.use('/user',users);

//connecting to data base
try{
    mongoose.connect('mongodb+srv://sivakrishna:qb4GwFPjiNNJTZ04@cluster0.7fc7lzg.mongodb.net/course',{useNewUrlParser: true, useUnifiedTopology: true, dbName: "course"});
}catch(error){
    console.log("Error occured in connetin the database");
}

app.listen(3000,()=>{
    console.log("I am Listening..!!");
})