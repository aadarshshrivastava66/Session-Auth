module.exports.isLogin=(req,res,next)=>{
    if(!req.user&&!req.admin){
        console.log("Please Login");
       return res.redirect("/user/login");
    }
    next();
}


module.exports.isAdmin=(req,res,next)=>{
    if(req.role!=="admin"){
        console.log("You Dont Have permission To access This");
        return res.redirect("/");
    }
    next();
}