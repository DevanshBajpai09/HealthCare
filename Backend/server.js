import express from 'express'
import cors from 'cors'
import connectDB from './Config/mongodb.js';
import connectCloudinary from './Config/cloudinary.js';

import 'dotenv/config'
import adminRouter from './Routes/adminRoute.js';
import doctorRouter from './Routes/doctorRoute.js';
import userRouter from './Routes/UserRoute.js';

// app config
const app = express();
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()


// middle ware

app.use(express.json())
app.use(cors())



// api endpoint

// app.use('/',(req,res)=>{
//     res.send('api working hi welcom ')


// })

app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRouter) 
app.use('/api/user',userRouter)



app.listen(port ,()=>{
    console.log('server started' , port)
})