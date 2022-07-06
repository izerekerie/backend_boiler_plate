import mongoose from "mongoose";
import { registerSchema } from 'swaggiffy';
const CandidateSchema=mongoose.Schema({
 names:{
    type:String,
    required:[true,'Schema is required']
 },
 votes:{
    type:[String],
     default:[],
 }

})
export  const Candidate=mongoose.model('Candidate',CandidateSchema);
registerSchema('Candidate', CandidateSchema, { orm: 'mongoose' });