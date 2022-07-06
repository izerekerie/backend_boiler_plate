import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRoutes from './routes/users';
import candidateRoutes from './routes/candidate';
const app=express();
import { Swaggiffy } from 'swaggiffy'; // Using import
dotenv.config();
app.use(express.json({limit:'30mb',extended:true}))
app.use(express.urlencoded({limit:'30mb',extended:true}))
app.use(express.text({limit:'30mb'}))
app.use(cors())
app.get('/',(req,res)=>{
    res.send("Welcome to our app");
})

 app.use('/users',userRoutes);
 app.use('/candidates',candidateRoutes);

const PORT= process.env.PORT||5000;
mongoose.connect(process.env.MONGOOSE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>app.listen(PORT,console.log(`Server running on port: ${PORT}`)))
 .catch(err=>console.log('Failed to connect to mongodb',err.message));
 new Swaggiffy().setupExpress(app).swaggiffy();