import mongoose from "mongoose";
const {Schema} = mongoose


const userSchema = new Schema({
    username:{
        required: true,
        unique: true,
        type:String
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
    },
    img:{
        type:String,
        required: false,
    },
    country:{
        type:String,
        required: true,
    },
    phone:{
        type:String,
        required: false,
    },
    password:{
        type:String,
        required: true,
    },
    desc:{
        type:String,
        required: false,
    },
    isSeller:{
        type:Boolean,
        default: false,
    }
},{timestamps:true})


export default mongoose.model("User",userSchema)
 