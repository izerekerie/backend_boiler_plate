import  bcrypt from 'bcrypt'
import { User,validateUser } from "../models/user";
import jwt from 'jsonwebtoken'
export const signup=async(req,res)=>{

const  {error}=validateUser(req.body);
if(error) return res.status(400).send(error.message);
const {name,email,password}=req.body;
try{
const existingUser= await User.findOne({email});
if(existingUser) return res.status(400).json({message:'user already exist'})
const salt= await bcrypt.genSalt(10);
const hashedPassword= await bcrypt.hash(password,salt);

const createdUser= await User.create({name,email,password:hashedPassword})

//generateToken
const token=jwt.sign({id:createdUser._id},process.env.JWT_SECRET,
    {expiresIn:'2h'});
res.status(200).json({createdUser,token})

}catch(err){
    res.status(500).json(err.message)

}

}
export const signin=async(req,res)=>{
const {email,password}=req.body;
try{
const existingUser= await User.findOne({email});
const  isPasswordCorrect= await bcrypt.compare(password,existingUser.password)
if(existingUser && isPasswordCorrect){
    const token=jwt.sign({id:existingUser._id},process.env.JWT_SECRET,
        {expiresIn:'2h'})
        res.status(200).json({existingUser,token});
}else{
    res.json(404),json({message:'Invalid email or password'})
}
}catch(err){
    res.status(500).json(err.message)
  
}
}
