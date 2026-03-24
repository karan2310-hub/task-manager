//mongo connect krne ka
import mongoose from "mongoose";
export const connectDB= async()=>{
    try{
        await mongoose.connect("mongodb+srv://karan:12345@karan1.nr8ugst.mongodb.net/");
        console.log("db is connected");
    }catch(err){
        console.log(err);
    }
};
