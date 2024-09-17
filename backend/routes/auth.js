const express = require('express');
const userModel = require('../models/User');
const bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken');
const  fetchuser = require('../middleware/fetchuser')
// const User = require('../models/User');
// import { ExpressValidator } from 'express-validator';

const { body, validationResult } = require ('express-validator');
const router = express.Router();


router.post("/",[ body('name','enter a name of min length 3').isLength({min:3}),
    body('email','enter a valid email').isEmail(),body('password','enter a password of min length 5').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const salt = bcrypt.genSalt(10);
    bcrypt.hash(req.body.password, salt).then((hashedpassword)=>
    { return
        userModel.create({
            name:req.body.name,
            email:req.body.email,
            password:password
        }).then(user=>res.json({success:true,data:user}))
        .catch(error=>res.json(error))
    }
        
    )
    
})
// router.get("/",(req,res)=>
//     {res.json({a:10})
//    const user = new User(req.body)  (or) const user = User(req.body)[we have to import Schema from mongoose to use this]
 //  user.save()
// })
// 

//create a user  at "http://localhost:3000/auth/signup" 
router.post("/signup",[ body('name','enter a name of min length 3').isLength({min:3}),
    body('email','enter a valid email').isEmail(),body('password','enter a password of min length 5').isLength({min:5})
],async(req,res)=>{
    const userData = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(user){
           return res.status(400).json({success:false,message:"user already exists so login"})
        }
        else{
            const salt = await bcrypt.genSalt(10);
            const secpass =await bcrypt.hash(req.body.password, salt);
            const newUser = await userModel.create({
                name:req.body.name,
                email:req.body.email,
                password:secpass
            });
            const data ={
                user:{
                    id:newUser.id,
                }
            }
            // here we can provide the data and second one is the secret it should be stored seperately in .env file 
            //after the secret argument we can have the encoding algorithm 
            var token = jwt.sign(data, 'shhhhh');
                res.status(200).json({success:true,token:token});
            // res.status(200).json({success:true,data:newUser})

        }
    } catch (error) {
        res.status(400).json({success:false,error:error.message});
        console.log(error);
        
    }
})

router.post("/login",[  body('email','enter a valid email').isEmail(),
    body('password','password should not be null').exists()
],async(req,res)=>{
    const userData = req.body;
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({success:false,message:"invalid creadentials add a valid credentials"})
        }
        else{
            const correctPassword = await bcrypt.compare(userData.password,user.password);
            if(correctPassword){
                const data ={
                    user:{
                        id:user.id,
                    }
                }
                // here we can provide the data and second one is the secret it should be stored seperately in .env file 
                //after the secret argument we can have the encoding algorithm 
                var jwt_token = jwt.sign(data, 'shhhhh');
                    res.json({success:true,token:jwt_token});
                // res.status(200).json({success:true,data:newUser})
    
                // res.status(200).json({success:true,data:user})
            }
            else{
                res.status(400).json({success:false,message:"invalid creadentials add a valid credentials"})
            }
            // if(user.password ===userData.password){
            //     res.status(200).json({success:true,data:user})
            // }
            // else{
            //     res.status(400).json({success:false,message:"invalid creadentials add a valid credentials"})
            // }

        }
    } catch (error) {
        res.status(400).json({success:false,error:error.message});
        console.log(error);
        
    }
})

router.post("/getuser",fetchuser,async(req,res)=>{

    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId).select("-password")
         res.status(200).json({success:true,user});
          
    } catch (error) {
        res.status(400).json({success:false,error:error.message});
        console.log(error);
        
    }
})

router.post("/resetpassword",async(req,res)=>{
    const userData = req.body;
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({success:false,message:"dont have account so signup first"})
        }
        else{
                const updateduser = await userModel.findOneAndUpdate({email:userData.email},{password:userData.password})
                res.status(200).json({success:true,data:user})
        }
    } catch (error) {
        
        console.log(error);
        
    }
})

module.exports = router;