const express= require('express');
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
const {SECRET}=require('../Middleware/auth');
const {authfunction}=require('../Middleware/auth');
const {User,Admin,Course}=require('../db/index')
const router=express.Router();

router.post('/signup', async(req,res)=>{
    const {username,password}=req.body;
    const valid=await User.findOne({username});
    if(valid){
        res.json({Message:"The User is Already Exits...!!"});
    }
    else{
        const newuser= new User({username,password});
        await newuser.save();
        const token=jwt.sign({username,role:'User'},SECRET,{expiresIn:'1h'});
        res.json({Message:"The user login successfull",Token:token});
    }
})
router.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const user= await User.findOne({username, password});
    if(user){
        const token=jwt.sign({username,role:"User"},SECRET,{expiresIn:'1h'});
        res.json({Message:"Loggin Successfull...!!",Token:token});
    }
    else{
        res.status(403).json({Message:"Invalid Detailed Entered...!!"});
    }
})
router.get('/courses',authfunction,async(req,res)=>{
    const courses= await Course.find({published:true});
    res.json({courses});
})
router.post('/courses/:courseid',authfunction,async(req,res)=>{
    const course= await Course.findById(req.params.courseid);
    console.log(course);
    if(course){
        const user= await User.findOne({username:req.body.username});
        if(user){
            user.parchesedcourse.push(course);
            await user.save();
            res.json({Message:"Course Parched Successfully"});
        }else{
            res.status(403).json({Message:"User Not found"}); 
        }
    }
    else{
            res.status(404).json({Message:"Course Not found"});
    }
})
router.get('/parchesedcourse',authfunction,async(req,res)=>{
    const user=await User.findOne({username:req.user.username}).populate('parchesedcourse');
    if(user){
        res.json({parchesedcourse:user.parchesedcourse || []});
    }
    else{
        res.status(403).json({Message:"User Not Found....!!"});
    }
})
module.exports= router