const express=require('express');
const router=express.Router();
const passport=require('passport');
const admin=require('../models/admin');

router.get('/register',(req,res)=>{
    res.render('admin/register');
})

router.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const newAdmin= new admin({username});
    await admin.register(newAdmin,password);
    res.send("Admin Registerd");
})

router.get('/login',(req,res)=>{
    res.render('admin/login.ejs')
})

router.post('/login',passport.authenticate("adminLocal",
    {
       failureFlash: true,
        failureRedirect: "/admin/login",
    }),
    (req,res)=>{
        res.redirect('/admin/dashboard');
    }
)

router.get('/dashboard',(req,res)=>{
    res.render('admin/dashboard.ejs')
})

router.get('/logout',(req,res,next)=>{
    req.logOut(function (err){
        if(err) return next(err);
        req.session.destroy(()=>{
            console.log("Admin Logout SuccessFully");
            res.redirect('/');
        })
    })
})

module.exports=router;