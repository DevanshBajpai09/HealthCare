import express from "express";


import  {allDoctorAppointment, appointmentCancel, appointmentComplete, doctorDashbored, DoctorList, doctorProfile, loginDoctor, updateDoctorProfile} from "../Controllers/docController.js";
import authDoctor from "../Middlerware/authDoctor.js";

const doctorRouter = express.Router()


doctorRouter.get('/list' , DoctorList)
doctorRouter.post('/login-doctor' , loginDoctor)
doctorRouter.get('/appointment-doctor' ,authDoctor, allDoctorAppointment)
doctorRouter.post('/appointment-cancel' ,authDoctor, appointmentCancel)
doctorRouter.post('/appointment-complete' ,authDoctor, appointmentComplete)
doctorRouter.get('/doctor-dashbored' ,authDoctor, doctorDashbored)
doctorRouter.get('/doctor-profile' ,authDoctor, doctorProfile)
doctorRouter.post('/doctor-update' ,authDoctor, updateDoctorProfile)



export default doctorRouter


