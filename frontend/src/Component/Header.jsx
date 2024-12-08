import React from 'react'
import { assets } from '../assets/assets_frontend/assets'



const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-primary rounded-lg px-3 mt-3 md:px-10 lg:px-20'>
    {/* left side */}
    <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 px-5 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl  text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
            Book Appointment <br /> with Trusted Doctor

        </p>
        <div className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light '>
            <img className='w-28' src={assets.group_profiles} alt="" />
            <p>Simply browse through our extensive list of trusted doctors, <br className=' hidden sm:block' />
            schedule your appointment hassle-free.</p>
        </div>
        <a href='#speciality' type="button" className="text-blue  hover:bg-blue-800  rounded-full text-md px-5 py-2.5 text-center inline-flex items-center bg-white dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:scale-105 transition-all duration-300">
Book Appointment
<svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
</svg>
</a>
    </div>
    {/* right side */}

    <div className='md:w-1/2 relative'>
        <img className='w-full md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
    </div>
    

      
    </div>
  )
}

export default Header
