import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets'

const DoctorAppointment = () => {
    const{getAppointment , appointments,dtoken ,calculateAge,currencySymbol,slotDateFormate,cancelappointment,completeappointment} =useContext(DoctorContext)
        useEffect(()=>{
            getAppointment()

        },[dtoken])
  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointment</p>
        <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
            <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
                <p>#</p>
                <p>Patient Details</p>
                <p>Payment</p>
                <p>Age</p>
                <p>Date & Time</p>
                <p>Fees</p>
                <p>Action</p>
            </div>
            <div>
            {appointments.reverse().map((item,index)=>{
          return (
          <div className='flex flex-wrap justify-between  max-sm:gap-2 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-8 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
            </div>
            <p className='text-xs text-center inline border border-primary px-2 rounded-full'>
                {item.payment ? 'Online': 'CASH'}
            </p>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormate(item.slotDate)} , {item.slotTime}</p>
            <p>{currencySymbol}{item.amount}</p>
            {item.cancelled 
            ?  <p className='text-red-600 text-xs font-medium'>Cancelled</p> 
            : item.isCompleted 
            ? <p className='text-green-600 text-xs font-medium'>Completed</p> 
            : <div className='flex'>
                <img onClick={()=>cancelappointment(item._id)}  className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                <img onClick={()=>completeappointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
            </div>}
            
            </div>
      )
        })}
            </div>
        </div>
      
    </div>
  )
}

export default DoctorAppointment