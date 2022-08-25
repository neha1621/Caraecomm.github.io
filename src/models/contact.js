const mongoose =require("mongoose");

const customersSchema=new mongoose.Schema({
    cName:  {
        type:String,
        required:true
    },
    cEmail:{
        type:String,
        required:true,
        unique:true
    },
    cSubject:{
        type:String,
        required:true
    },
    cMessage:{
        type:String,
        required:true

    }


})

const Contact=new mongoose.model("Contact",customersSchema);

module.exports=Contact;