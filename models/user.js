import mongoose from "mongoose";
const user_schema= new mongoose.Scehma({
    name: String,
    email: String,
    password: String,
    role:{
        type: String, //teacher or student or admin 
       enum:["admin","member"],
       default:"member"
    }
},{timestamps: true});//ye time stamp se do cheejen hongi -> created at and updaterd at_> save hoag

export default mongoose.models.User || mongoose.model("User", user_schema);
//phla wala means phle se hi models ke andr user na ka ho model to whoi..
// is line ka maine kaam jo next mai reload bar bvar hota hai to us se model overwrite na ho useke liye ahi ye.
