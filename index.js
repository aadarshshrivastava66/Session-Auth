const express=require('express');
const app=express();
const session=require('express-session')
const passport=require('passport')
const LocalStrategy=require('passport-local')
const mongoose=require('mongoose')
const user=require('./models/user')
const admin=require('./models/admin')
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
const mongoUrl='mongodb://127.0.0.1:27017/Session_auth';
async function main(){
    try{
        await mongoose.connect(mongoUrl);
        console.log('Connected to DB');
    }catch(err){
        console.log("Error connecting to DB", err);
    }
}

main();
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret:"Session-Auth",
    resave:false,
    saveUninitialized:false,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
        httpOnly:true,
        signed:true
    }

}))

app.use(passport.initialize());
app.use(passport.session());

passport.use("userLocal", new LocalStrategy(user.authenticate()));
passport.use("adminLocal", new LocalStrategy(admin.authenticate()));

passport.serializeUser((user,done)=>{
    done(null,{id:user.id,role:user.role})
})

passport.deserializeUser((obj,done)=>{
    if(obj.role==="user"){
        user.findById(obj.id).then(user=>done(null,user));
    }else if(obj.role==="admin"){
        admin.findById(obj.id).then(admin=>done(null,admin));
    }
})

app.use((req,res,next)=>{
  res.locals.currUser=req.user|| req.member;  
  next();
})

const userRoute=require('./routes/user')
app.use('/user',userRoute);

const adminRoute=require('./routes/admin');
app.use('/admin',adminRoute);

app.get('/',(req,res)=>{
    res.render('home.ejs');
});



app.listen(8080,()=>{
    console.log("we are on port 8080");
})