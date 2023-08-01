const mongoose=require('mongoose');
//Defining Schemes in mongoose
const userschema= new mongoose.Schema({
    username:{type:String},
    password: String,
    parchesedcourse: [{type: mongoose.Schema.Types.ObjectId ,ref :'Course'}]
})
const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
  publishedbyme: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});
const courseschema= new mongoose.Schema({
    title: String,
    description:String,
    Price: Number,
    imagelink:String,
    published:Boolean
})
// Defining the models
const User= mongoose.model('User',userschema);
const Admin=mongoose.model('Admin',adminSchema);
const Course=mongoose.model('Course',courseschema);

module.exports={
    User,
    Admin,
    Course
}