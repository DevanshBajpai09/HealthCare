import React, { useContext } from 'react'
import {  doctors } from '../assets/assets_frontend/assets'
import {  useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'


const TopDoctor = () => {
    const navigate = useNavigate()
    const {doctors} = useContext(AppContext)
    return (
        <>
            <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
                <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
                <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
                <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                    {
                        doctors.slice(0, 10).map((item, index) => {
                            return (

                                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                                <img className='bg-blue-50' src={item.image} alt="" />
                                <div className='p-4'>
                                    <div className={`flex items-center text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                        <p className={`w-2 mt-0.5 h-2 ${item.available ? 'bg-green-500' : 'bg-gray-500' } rounded-full`}></p><p className='mx-2'>{item.available ? 'Available' : 'Not Available'}</p>
                                    </div>
                                    <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                                    <p className='text-gray-600 text-sm'>{item.speciality}</p>
                                </div>
                            </div>
                    )
                        })
                        
                    }
                </div>
                <a onClick={()=> {navigate('/doctors'); scroll(0,0)}} type="button" className="rounded-full text-md px-12 py-3 mt-10 text-center inline-flex items-center hover:scale-105 transition-all duration-300 bg-blue-50 text-gray-600">
                    More
                    <svg className="mt-1 rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </a>
            </div>

        </>
    )
}

export default TopDoctor
