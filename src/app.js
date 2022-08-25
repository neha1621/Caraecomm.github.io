const express = require ("express");
const path=require("path");
const app=express();
const hbs=require("hbs");


require("./db/conn");
const Register=require("./models/registers");
const{json}=require("express");
const register = require("./models/registers");
const Contact=require("./models/contact");



const port =process.env.port || 2000;

const static_path=path.join(__dirname,"../public");
const templates_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");


app.use(express.json());
app.use(express.urlencoded({extended:false}));


app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);


app.get("/",(req,res)=>{
    res.render("");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/shop",(req,res)=>{
    res.render("shop");
})

app.get("/blog",(req,res)=>{
    res.render("blog");
})

app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.get("/sproduct",(req,res)=>{
    res.render("sproduct");
})
app.get("/cart",(req,res)=>{
    res.render("cart");
})


app.get("/index",(req,res)=>{ 
    res.render("index")
});

app.get("/register",(req,res)=>{
    res.render("register");
})


app.get("/login",(req,res)=>{
    res.render("login");
})



app.post("/register", async (req,res)=>{

    try{

        const password=req.body.password;
        const confirmpassword=req.body.confirmpassword;
        if(password===confirmpassword){

            const registerCustomer=new Register({
                fullname: req.body.fullname,
                username:req.body.username,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                password:password,
                confirmpassword:req.body.confirmpassword

            })
            const register= await registerCustomer.save();
            res.status(201).render("login");
        }
        else{
            res.send("password are not matching")
        }

    

    } catch (error) {
        res.status(400).send(error);
    }
    

})

app.post("/login",async(req,res)=>{
    try{
        const email=req.body.email;
        const password=req.body.password;

        const useremail=await register.findOne({email:email});
        
        if(useremail.password===password){
            res.status(201).render("index");
           

        }
        else{
            res.send("Invalid Login Details");
        }
    }
    catch (error){
        res.status(400).send("Invalid Login Details");

    }
    
})



app.post("/contact", async (req,res)=>{
    try{
        const contactemployee= new Contact({
            cName:req.body.cName,
            cEmail:req.body.cEmail,
            cSubject:req.body.cSubject,
            cMessage:req.body.cMessage
            


        })
        const contact= await contactemployee.save();
        res.status(201).render("contact");
    }
    catch(error){
        res.status(400).send(error);

    }
})




app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})