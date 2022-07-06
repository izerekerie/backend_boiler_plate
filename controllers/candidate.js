import mongoose from "mongoose";
import { Candidate } from "../models/candidate";

export const  create=async(req,res)=>{

    const candidate=req.body;

    try{
      const newCandidate=new Candidate(candidate);
      await newCandidate.save();
      res.status(201).json(newCandidate);
    }catch(error){
        res.status(404).json({message:error.message.data});
    }
    
}
export const vote= async(req,res)=>{
const id=req.params.id;
if(!req.userId) return  res.json({message:"auntheticated"})
if(!mongoose.Types.ObjectId.isValid(id)) return  res.status(404).json({message:'no such id found'})
const candidate= await Candidate.findById(id);
const index=candidate.votes.findIndex((id)=>id ==String(req.userId));

if(index===-1){
    postMessage.likes.push(req.userId);
}else{
    postMessage.likes=candidate.votes.filter((id)=>id !==String(req.userId))
}

const updatedCandidate= await Candidate.findByIdAndUpdate(id,candidate,{new:true})
res.statust(200).json(updatedCandidate);
}


export const deleteC=async(req,res)=>{
const id=req.params.id;

try{
 if(!mongoose.Types.ObjectId.isValid(id)){
    return  res.status(404).send('no task with such id');
 }
await Candidate.findByIdAndDelete(id);
res.status(200).json({message:'candidate deleted sucessfully'});
}catch(error){
res.status(404).json(error.response.data);
}
}
export const update=async(req,res)=>{
const id=req.params;
const candidate=req.body;
try{
  if(!mongoose.Types.ObjectId.isValid) return res.status(404).json({message:'no such id'})

  const updatedCandidate= await Candidate.findByIdAndUpdate(id,candidate,{new:true})
  res.status(200).send(updatedCandidate);
}catch(err){
    res.status(404).json({message:error.message})
}

}
export const getAll=async(req,res)=>{
const candidates= await Candidate.find();
res.status(200).json(candidates);
}
export const getOne=async(req,res)=>{
const id=req.params.id;
try{
    const candidate= await findById(id);
    res.status(200).json(candidate);
}catch(error){
    res.status(400).status(error.message)
}


}