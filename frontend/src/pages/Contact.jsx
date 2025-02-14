import React from 'react'
import { assets } from '../assets/assets_frontend/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-gray-500 pt-10 text-2xl'>
        <p>Contact <span className='font-semibold text-gray-700'>Us</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm' >
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col justify-center items-start  gap-6'>
          <p className='font-semibold text-lg text-gray-600'>Our OFFICE</p>
          <p className='text-gray-500'>54709 Willms Station <br />Suite 350, Washington, USA</p>
          <p className='text-gray-500'>Tel: (415) 555‑0132 <br />Email: greatstackdev@gmail.com</p>
          <p className='font-semibold text-lg text-gray-600'>Careers at PRESCRIPTO</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button type="button" className="text-md px-12 py-3 mt-2 text-center inline-flex items-center hover:scale-105 transition-all duration-100 border border-black hover:bg-black hover:text-white">
                    Explore More
                    
                </button>
        </div>
      </div>
      
    </div>
  )
}

export default Contact
