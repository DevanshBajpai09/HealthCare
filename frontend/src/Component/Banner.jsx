import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()
  return (
    <>
    <div className='flex bg-primary rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>

    {/* Left side */}
    <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-white'>

        <h1>Book Appointment </h1>
            <p className='mt-4'> With 100+ Trusted Doctors </p>
        </div>
        <a onClick={()=>{navigate('/login'); scroll(0,0)}}  type="button" className="rounded-full text-md px-12 py-3 mt-10 text-center inline-flex items-center hover:scale-105 transition-all duration-300 bg-blue-50 text-gray-600">
                    Create Account
                    <svg className="mt-1 rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
        
    </div>
    {/* right side */}
    <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute bottom-0 right-0 mx-w-md' src={assets.appointment_img} alt="" />
    </div>
      
    </div>
    </>
  )
}

export default Banner
