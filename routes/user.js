const express=require('express')
const router=express.Router();
const passport=require('passport')
const user=require('../models/user');

router.get("/register",(req,res)=>{
    res.render('user/register.ejs');
})

router.post('/register',async(req,res)=>{
    const {username,password}=req.body;
    const newUser=new user({username});
    const registeredUser=await user.register(newUser,password);
    console.log(registeredUser);
    res.send("userRegisterd")
})

router.get('/login',(req,res)=>{
    res.render('user/login.ejs')
})

router.post('/login',
    passport.authenticate("userLocal",
    {failureFlash: true,
    failureRedirect: "/user/login",})
    ,async(req,res)=>{
        console.log("welcome User");      
        res.redirect('/user/dashboard')

})

router.get('/dashboard',(req,res)=>{
    res.render('user/dashborad');
})


router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy(() => {   
        console.log('log Out Successfully')
      res.redirect('/');
    });
  });
});

module.exports=router;