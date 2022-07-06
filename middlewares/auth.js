import jwt from "jsonwebtoken"
import { User } from "../models/user"
export const auth=(req,res,next)=>{
if(req.headers.authorizarion && req.headers.authorizarion.startWith('Bearer')){
    try{

        const token=req.headers.authorizarion.split("")[1]
        const decodedData=jwt.verify(token,process.env.JWT_SECRET);
        //req.user=await User.findById(decodedData?.id)
        req.userId=decodedData?.id;// can be  when voting
        next();
    }catch(error){
        res.json({message:'Session expired'});
    }
}else{
    res.status(404).json({message:'unauthorized'})
}

}