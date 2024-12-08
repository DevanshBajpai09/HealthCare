import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../Models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../Models/appointmentModel.js'
import userModel from '../Models/userModel.js'

// Api for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
        // console.log(req);
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please use a strong password" });
        }

        if (!imageFile) {
            return res.json({ success: false, message: "Image file is required" });
        }

        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({ success: true, message: 'Doctor added successfully' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// api for  admin login

const loginAdmin = async(req,res)=>{
    try{

        const {email , password} = req.body
        if(email==process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true,token})



        }else{
            res.json({success:false,message:'Invalid Credentials'})
        }

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}


// api to get all doctor ist for admin panel

const allDoctors = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true , doctors})

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });



    }

}


// API TO GET ALL APOOINTMENT LIST
const appointmentAdmin =async(req,res)=>{
    try{
        const appointments = await appointmentModel.find({})
        res.json({success:true,appointments})

    }catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });

    }

}

// API TO CANCEL APPOINTMENT FOR ADMIN

const AppointmentcancelAdmin = async (req, res) => {
    try {
      const {appointmentId } = req.body
      const appointmentData = await appointmentModel.findById(appointmentId)
  
      // veify appointment user
      
      await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
  
      // reeasing doctor slot
      const { docId, slotDate, slotTime } = appointmentData
      const doctorData = await doctorModel.findById(docId)
      let slots_booked = doctorData.slots_booked
      if (slots_booked[slotDate]) {
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
  
      }
      await doctorModel.findByIdAndUpdate(docId, { slots_booked })
      res.json({ success: true, message: 'Appointment Cancelled' })
      if (!appointmentData) {
        return res.json({ success: false, message: 'Appointment not found' });
      }
  
      if (!doctorData) {
        return res.json({ success: false, message: 'Doctor not found' });
      }
  
  
  
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
  
    }
  }

//   API TO DASHBORED DATA FRO ADMIN PANEL

const adminDashbored =async(req,res)=>{
    try{

        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointment =await appointmentModel.find({})

        const dashData ={
            doctors :doctors.length,
            apppointments :appointment.length,
            patients:users.length,
            latestappointments:appointment.reverse().slice(0,5)
        }

        res.json({success:true , dashData  })


    }catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
  
    }
}

export {addDoctor,loginAdmin ,allDoctors ,appointmentAdmin ,AppointmentcancelAdmin ,adminDashbored};


