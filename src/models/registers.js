const mongoose =require("mongoose");

const customerSchema=new mongoose.Schema({
    fullname:  {
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    gender:{
        type:String,
        required:true
    },

    phone:{
        type:Number,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    confirmpassword:{
        type:String,
        required:true
    }

})

const register=new mongoose.model("register",customerSchema);

module.exports=register;