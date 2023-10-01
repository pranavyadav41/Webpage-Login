var express=require("express");
var router=express.Router();

const credential={
  email:"pranavyadav@gmail.com",
  password:"pranav123"
}


//Login user
router.post('/login',(req,res)=>{
    if(req.body.email==credential.email&&req.body.password==credential.password){
        req.session.user=req.body.email;
        res.redirect('/route/dashboard');
        // res.end("Login Successful");
    }else{
        res.render("base", { message: "Username or Password is incorrect",title:'Login'});
    }
    
});

//route for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render('dashboard',{user:req.session.user, title:"Dashboard Title"});
    }else{
        res.redirect("/")
    }
})

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Eror")
        }else{
            res.render('base',{title:"Express",logout:"logout Successfull"})
        }
    })
})

module.exports=router;