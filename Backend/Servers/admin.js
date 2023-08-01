const express= require('express');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const {SECRET}=require('../Middleware/auth');
const {authfunction}=require('../Middleware/auth');
const {User,Admin,Course}=require('../db/index')
const router=express.Router();
router.post('/signup',  async (req,res)=>{
    const { username,password}=req.body;
    const valid= await Admin.findOne({username})
        if(valid){
            res.status(403).json({Message:"The user already Exits...!!"});
        }
        else{
            const obj ={ username:username,password:password };
            const newAdmin= new Admin(obj);
            newAdmin.save();
            const token=jwt.sign({username,role: 'admin'},SECRET,{ expiresIn: '1h'});
            res.json({Message:"Admin Creates Succcessfully",Token:token});
        }
});
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const valid= await Admin.findOne({ username , password });
    if(valid){
        const token=jwt.sign({username,role:'Admin'},SECRET,{expiresIn: '1h'});
        res.json({Message:"Logged In successfully",token});
    }
    else{
            res.status(403).json({Message:"Wrong Details Entered....!!"});
    }
});
router.post('/courses', authfunction, async (req, res) => {
    try {
      const course = new Course(req.body);
      await course.save();
      const admin = await Admin.findOne({ username: req.user.username });
      console.log(admin);
      if (admin) {
        admin.publishedbyme.push(course._id);
        await admin.save();
        console.log(admin);
        res.json({ Message: "Course Created Successfully", course: course._id });
      } else {
        res.json({ message: "error in creating..!!" });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
router.put('/courses/:courseid',authfunction, async(req,res)=>{
    const course= await Course.findByIdAndUpdate(req.params.courseid,req.body,{new: true});
    if(course){
        res.json({Message:"Course Updated Succefully"});
    }
    else{
        res.json({Message:"course Not Found"});
    }
})
router.get('/courses',authfunction, async (req,res)=>{
    const courses= await Course.find({});
    res.json({courses});
})
router.get('/me/:courseId', authfunction, async (req, res) => {
    const course = await Course.findById(req.params.courseId);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
router.get('/me',authfunction, async (req,res)=>{
    res.json({username:req.user.username});
})
router.get('/publications', authfunction, async (req, res) => {
const admins = await Admin.findOne({ username: req.user.username }).populate('publishedbyme');
if (admins) {
  res.json({mycourses:admins.publishedbyme || [] });
} else {
  res.status(403).json({ message: 'User not found' });
}
});
//need to add the delete route
module.exports=router