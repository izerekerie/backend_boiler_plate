
import mongoose from "mongoose";
import Joi from "joi";
const UserSchema=mongoose.Schema({

    name:{
        type:String,
        required:[true,"user name required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    }
})
export const User=mongoose.model('User',UserSchema);

export const validateUser=(user)=>{
 const schema=Joi.object({

  name:Joi.string().required().min(3),
  email:Joi.string().email().required(),
  password:Joi.string().required()

})
return schema.validate(user);
}