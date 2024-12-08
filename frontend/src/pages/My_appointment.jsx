import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const My_appointment = () => {
  const navigate = useNavigate()

  const { backendURL, token, getDoctorsData } = useContext(AppContext)
  const [appointments, setappointments] = useState([])
  const [months] = useState(["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"])

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]

  }
  const getAppointment = async () => {
    try {
      const { data } = await axios.get(backendURL + '/api/user/list-appointment', { headers: { token } })
      if (data.success) {
        setappointments(data.appointments.reverse())
        console.log(data.appointments)



      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  const cancelappointment = async (appointmentId) => {
    try {

      const { data } = await axios.post(backendURL + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        getAppointment()
        getDoctorsData()

      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)

    }
  }

  //  THe recipt for razorpay

  const initPay = (orderRazorpay) => {
    console.log('Razorpay Order:', orderRazorpay); // Debug log

    if (!orderRazorpay.amount) {
      return toast.error('Amount is missing in Razorpay order');
    }

    const options = {
      key: import.meta.env.VITE_RAZOR_PAY_ID,
      amount: orderRazorpay.amount,
      currency: orderRazorpay.currency,
      name: 'Appointment Payment',
      description: 'Appointment Payment',
      order_id: orderRazorpay.id,
      receipt: orderRazorpay.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(
            `${backendURL}/api/user/verify-razorpay`,
            response,
            { headers: { token } }
          );

          if (data.success) {
            getAppointment();
            navigate('/myappointment');
          } else {
            toast.error('Payment verification failed');
          }
        } catch (error) {
          console.error('Payment Verification Error:', error.message);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  const appointmentRazorpay = async (appointmentId) => {
    try {
      if (!appointmentId) {
        return toast.error('Appointment ID is missing');
      }

      const { data } = await axios.post(
        `${backendURL}/api/user/payment-razorpay`,
        { appointmentId },
        { headers: { token } }
      );

      if (data.success && data.order) {
        initPay(data.order); // Pass the order object to Razorpay initialization
      } else {
        toast.error(data.message || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Razorpay Payment Error:', error.message);
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (token) {
      getAppointment()
    }
  }, [token])

  return (
    <div>
      <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My Appointment</p>
      <div>
        {appointments.map((item, index) => {
          return (

            <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-xs'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>Date & Time : </span>{slotDateFormate(item.slotDate)} |  {item.slotTime}</p>

              </div>
              {/* <div></div> make structure responsive */}
              <div className='flex flex-col gap-2 justify-end'>
                {!item.cancelled && item.payment && !item.isCompleted &&  <button className='sm:min-w-28 py-2 border rounded text-stone-500 bg-indigo-50'>Paid</button>}
                {!item.cancelled && !item.payment && !item.isCompleted &&  <button onClick={() => appointmentRazorpay(item._id)} type="submit" className="rounded text-sm  py-2  text-center hover:bg-blue-800 hover:text-white transition-all duration-300  border-blue-800 text-stone-500 border">
                  Pay Online
                </button>}
                {!item.cancelled && !item.isCompleted &&  <button onClick={() => cancelappointment(item._id)} type="submit" className="rounded text-sm  py-2 px-5  text-center hover:bg-red-800 hover:text-white transition-all duration-300  border-red-800 text-stone-500 border">
                  Cancel Appointment
                </button>}
                {item.cancelled && !item.isCompleted &&  <button className='sm:min-w-48 py-2 border border-red-800 rounded text-red-500'>Appointment Cancelled</button>}
                {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

              </div>

            </div>
          )
        })}
      </div>


    </div>
  )
}

export default My_appointment
