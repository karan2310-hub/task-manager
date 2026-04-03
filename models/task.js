import mongoose from "mongoose";

const task_schema=new mongoose.Schema({
    title:String,
    description:String,
    status:{
        type:String,
        enum:["todo","in-progress","done"],
        default:"todo"
    },
    dueDate:Date,
    assignedTo:{
         type: mongoose.Schema.Types.ObjectId,
    ref: "User"
    },
    //aab ye task kis board ka hai wo bta rhe
    board:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Board"
    },
     activity: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      action: String,
      time: {
        type: Date,
        default: Date.now
      }
    }
  ]
}, {timestamps:true});

export default mongoose.models.task||mongoose.model("task", task_schema)