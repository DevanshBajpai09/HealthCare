import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets_frontend/assets'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { VscVerified } from "react-icons/vsc";
import RelatedDoctors from '../Component/RelatedDoctors';
import {toast} from 'react-hot-toast';
import axios from 'axios';



const Appointment = () => {

  const { docId } = useParams()

  const dayOfweek = ["SUN", "MON", "TUE", "THU", "FRI", "SAT", "SUN"]

  const navigate = useNavigate()

  const { doctors, currencySymbol ,getDoctorsData,backendURL , token} = useContext(AppContext)
  const [docSlot, setdocSlot] = useState([])
  const [slotIndex, setslotIndex] = useState(0)
  const [slotTime, setslotTime] = useState('')

  const [docInfo, setdocInfo] = useState(null)
  const fetchInfo = async () => {
    try{
      const docInfo = await doctors.find(doc => doc._id === docId);
      console.log("docinfo", docInfo)
      setdocInfo(docInfo)
    }catch(e) {
      console.log(e);
    }


  }

  const getavlSlot = async () => {
    if (!docInfo) return;
  
    const slots = [];
    const today = new Date();
  
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);
  
      if (i === 0) {
        if (currentDate.getMinutes() > 30) {
          currentDate.setHours(currentDate.getHours() + 1, 0, 0, 0);
        } else {
          currentDate.setMinutes(30);
        }
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }
  
      const daySlots = [];
      while (currentDate < endTime) {
        const slotTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`;
        const isSlotAvailable =
          !docInfo.slots_booked[slotDate]?.includes(slotTime);
  
        if (isSlotAvailable) {
          daySlots.push({
            datetime: new Date(currentDate),
            time: slotTime,
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
  
      slots.push(daySlots);
    }
  
    setdocSlot(slots);
  };
  

  const bookAppointment = async () => {
    if (!token) {
      toast("Login to book appointment", { icon: "⚠️" });
      return navigate('/login');
    }
  
    try {
      const date = docSlot[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + "_" + month + "_" + year;
  
      // Call the API to check if the user has already booked an appointment
      const { data } = await axios.post(
        backendURL + '/api/user/book-appointment',
        { docId, slotDate, slotTime },
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/myappointment');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  




  useEffect(() => {
    fetchInfo()
  }, [doctors, docId])

  useEffect(() => {
    getavlSlot()

  }, [docInfo])

  useEffect(() => {
    console.log(docSlot)
  }, [docSlot])

 
  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4 mt-5'>

        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex items-center gap-2 text-2xl font-medium teext-gray-900'>{docInfo.name}
            <p className='w-5 mt-1.5'>
              < VscVerified />

            </p>
          </p>
          <div className='flex items-center gap-2 text-sm  text-gray-600 mt-3'>

            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>

            <p className='flex mt-3 items-center gap-1 text-sm font-medium text-gray-600'>About
              <p>
                <HiOutlineExclamationCircle />
              </p>
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-2'>{docInfo.about}</p>
            <p className='text-gray-500 font-medium mt-4'>Appointment fees : <span className='text-gray-600'>{currencySymbol}{docInfo.fees}</span></p>
          </div>
        </div>

      </div>
      {/* booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots</p>
        <div className='flex gap-4 items-center w-full overflow-x-scroll mt-4'>
          {docSlot.length >0 &&
            docSlot.map((item, index) => (
              <div
                onClick={() => setslotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-gray-200'
                  }`}
                key={index}
              >
                <p>{item[0] && dayOfweek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))}
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docSlot.length >0 &&
            docSlot[slotIndex]?.map((item, index) => (
              <p
                onClick={() => setslotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-gray-400 border border-gray-300'
                  }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button onClick={bookAppointment} type="submit" className="rounded-full text-md px-12 py-3 mt-10 text-center inline-flex items-center hover:scale-105 transition-all duration-300 bg-primary text-white">
                    Book an Appointment
                    </button>
      </div>

{/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>


    </div>
  )
}

export default Appointment
