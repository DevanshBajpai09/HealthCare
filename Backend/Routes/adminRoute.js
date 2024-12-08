import express from "express";
import {addDoctor,  adminDashbored,  allDoctors,  appointmentAdmin,  AppointmentcancelAdmin,  loginAdmin } from '../Controllers/adminController.js'
import upload from "../Middlerware/Multer.js";
import authAdmin from "../Middlerware/authAdmin.js";
import  {changeAvailablity } from "../Controllers/docController.js";

const adminRouter = express.Router()

adminRouter.post('/add-doctor',authAdmin,upload.single('image'),addDoctor)
adminRouter.post('/login',loginAdmin)

adminRouter.post('/all-doctor',authAdmin,allDoctors)
adminRouter.post('/change-availability',authAdmin,changeAvailablity)
adminRouter.get('/appointments',authAdmin,appointmentAdmin)
adminRouter.post('/appointments-cancel',authAdmin,AppointmentcancelAdmin)
adminRouter.get('/admin-dashbored',authAdmin,adminDashbored)

export default adminRouter


