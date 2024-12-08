import express from 'express'
import { registerUser ,LoginUser, getProfile, updateProfile, BookAppointment, appointmentList, cancelAppointment, paymentRazorPay, verifyRazorPay } from '../Controllers/userController.js'
import authUser from '../Middlerware/authUser.js'
import upload from '../Middlerware/Multer.js'

const userRouter  = express.Router()

userRouter.post('/register' , registerUser)
userRouter.post('/login' , LoginUser)
userRouter.get('/get-profile' ,authUser, getProfile)
userRouter.post('/update-profile' ,upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment' ,authUser,BookAppointment)
userRouter.get('/list-appointment' ,authUser,appointmentList)
userRouter.post('/cancel-appointment' ,authUser,cancelAppointment)
userRouter.post('/payment-razorpay' ,authUser,paymentRazorPay)
userRouter.post('/verify-razorpay' ,authUser,verifyRazorPay)


export default userRouter