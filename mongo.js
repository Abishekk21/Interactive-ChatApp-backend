const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://Abishek:shps1YlOksGX9utB@cluster0.4exrkqj.mongodb.net/chatapp-data")
.then(()=>{
    console.log("connected");
})
.catch(()=>{
    console.log("failed");
})

const newSchema = new mongoose.Schema({
    currentMessage:{
        type: String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})

const collection=mongoose.model("collection",newSchema)

module.exports = collection