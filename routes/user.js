const express=require('express')
const router=express.Router();

const user=require('../models/user');

router.get("/register",(req,res)=>{
    res.render('user/register.ejs');
})

module.exports=router;