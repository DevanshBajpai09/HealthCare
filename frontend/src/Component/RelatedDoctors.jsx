import React, { useContext ,useEffect,useState} from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({speciality , docId}) => {

  const {doctors} = useContext(AppContext)
  const navigate = useNavigate()

  const [reldoc, setreldoc] = useState([])

  useEffect(()=>{
    if(doctors.length>0 && speciality){
       const doctorsData = doctors.filter((doc)=>doc.speciality === speciality && doc._id!=docId)
       setreldoc(doctorsData)


    }

  },[doctors,speciality,docId])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
                <h1 className='text-3xl font-medium'>Related Doctors</h1>
                <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
                <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                    {
                        reldoc.slice(0, 5).map((item, index) => {
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
            </div>
  )
}

export default RelatedDoctors