import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../Models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../Models/doctorModel.js'
import razorpay from 'razorpay'
import appointmentModel from '../Models/appointmentModel.js'

// API TO REGISTER USER

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !password || !email) {
      return res.json({ success: false, message: 'Missing details' })
    }

    // valiating email fromated
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter valid Email' })

    }
    // vaidating strong password
    if (password.length < 8) {

      return res.json({ success: false, message: 'Enter strong password' })
    }

    // hashing user password

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email: email,
      password: hashedPassword,

    }

    const newUser = new userModel(userData)
    const user = await newUser.save()
    // _id 

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })



  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

  }
}


const LoginUser = async (req, res) => {
  try {

    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.json({ success: false, message: 'User Does Not Exist' })

    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: 'Invalid Credentials' })
    }

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

  }
}


// API TO GET USER PROFILE DAATA

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body
    const userData = await userModel.findById(userId).select('-password')
    res.json({ success: true, userData })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })

  }

}


// API TO UPDATE  USER PROFIEL

const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: 'Data missing' })

    }
    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

    if (imageFile) {
      // Upload Image to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' })
      const imageURL = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId, { image: imageURL })
    }

    res.json({ success: true, message: 'profile updated' })


  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })


  }
}


// API TO BOOK APPOINTMENT

const BookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotTime, slotDate } = req.body;

    const docData = await doctorModel.findById(docId).select('-password');
    // Validate inputs
    if (!docData.available) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    let slots_booked = docData.slots_booked;

    // Initialize slots_booked for the specific date if it's undefined
    if (!slots_booked[slotDate]) {
      slots_booked[slotDate] = []; // Initialize as an empty array
    }

    // Check if the slot is already booked
    if (slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: 'Slot not available' });
    }

    // Add the new slot to the booked slots
    slots_booked[slotDate].push(slotTime);

    const userData = await userModel.findById(userId).select('-password');
    delete docData.slots_booked;

    // Create the appointment data
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Save the appointment
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update the doctor's slots_booked
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment booked successfully" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

//   api to get apppointment list


const appointmentList = async (req, res) => {
  try {
    const { userId } = req.body
    const appointments = await appointmentModel.find({ userId })

    res.json({ success: true, appointments })

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });

  }
}

//   Api to cancel Appointment

const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body
    const appointmentData = await appointmentModel.findById(appointmentId)

    // veify appointment user
    if (String(appointmentData.userId) !== userId) {
      return res.json({ success: false, message: 'Unauthoried action' })

    }
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

// API to make payment of appointment of raor pay
const razorpayInstance = new razorpay({
  key_id:process.env.RAZOR_PAY_ID,
  key_secret:process.env.RAZOR_PAY_SECRET
})

const paymentRazorPay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData || appointmentData.cancelled) {
      return res.json({ success: false, message: 'Appointment Cancelled or not found' });
    }

    const options = {
      amount: appointmentData.amount * 100, // Convert amount to paise
      currency: process.env.CURRENCY || 'INR',
      receipt: `${appointmentId}` // Ensure receipt is a string
    };

    const order = await razorpayInstance.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error('Razorpay API Error:', error);
    res.json({ success: false, message: error.message });
  }
};


// API TO VERIFY PAAYMENT OF RAORPAY

const verifyRazorPay = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the incoming request body
    const { razorpay_order_id } = req.body;

    if (!razorpay_order_id) {
      return res.status(400).json({ success: false, message: 'Order ID is required' });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log(orderInfo);

    if(orderInfo.status === 'paid'){
       await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
       res.json({ success: true, message:'Payment Successful'});
       
      }else{
      res.json({ success: true, message:'Payment Unsuccessful'});

    }


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};







export { registerUser, LoginUser, getProfile, updateProfile, BookAppointment, appointmentList, cancelAppointment ,paymentRazorPay , verifyRazorPay}