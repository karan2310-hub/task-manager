import mongoose from "mongoose";

const board_schema= new mongoose.Schema({
    title:String,
    description:String,
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"//means upar wala id  iss user collection ko belong krta hai
        //mongo mai stored har ek ka id banata hai wo 

       //to give db some relief-> yaha wapis poora user ka data store nhi krege
       //just id rkhlenge.....and aage jrurt lagi to Board.find().populate("owner")
       //ye ownerid ko hata user ka full data de dega !
       
    },
     members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, {timestamps:True});

export default mongoose.models.Board || mongoose.model("Board",board_schema);

// ****************************************************************************************
// ye ban gya apna, board ka schema

