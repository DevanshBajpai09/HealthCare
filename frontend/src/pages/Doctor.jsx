import React, { useContext ,useEffect ,useState } from 'react'
import {AppContext} from '../context/AppContext'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Doctor = () => {
  const navigate = useNavigate();
  const {speciality} = useParams()
  console.log(speciality)
  const [filterdoctor, setfilterdoctor] = useState([])
  const [show, setshow] = useState(false)

  const {doctors} = useContext(AppContext)
  


  useEffect(() => {
    if (speciality) {
      setfilterdoctor(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setfilterdoctor(doctors);
    }
   
  },[doctors,speciality])
  
  return (
    <div>
      <p className='text-gray-800 mt-5'>Browse through the doctor speciality</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`py-1 px-3 border rounded sm:hidden transition-all text-sm ${show ?'bg-primary text-white':''}`} onClick={()=>setshow(prev=>!prev)}>Filters</button>
        <div className={`flex-col gap-4 text-sm text-gray-600 ${show ? 'flex':'hidden sm:flex'}`}>
          <p onClick={()=>speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer rounded transition-all  ${speciality === "General physician" ? "bg-indigo-100 text-black":" "}`}>General physician</p>
          <p onClick={()=>speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer rounded transition-all ${speciality === "Gynecologist" ? "bg-indigo-100 text-black":" "}`}>Gynecologist</p>
          <p onClick={()=>speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer rounded transition-all ${speciality === "Dermatologist" ? "bg-indigo-100 text-black":""}`}>Dermatologist</p>
          <p onClick={()=>speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer rounded transition-all ${speciality === "Pediatricians" ? "bg-indigo-100 text-black":""}`}>Pediatricians</p>
          <p onClick={()=>speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer rounded transition-all ${speciality === "Neurologist" ? "bg-indigo-100 text-black":""}`}>Neurologist</p>
          <p onClick={()=>speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94w] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 cursor-pointer rounded transition-all ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black":""}`}>Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
          {
            filterdoctor.map((item,index)=>{
              return (

                <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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
      
    </div>
  )
}

export default Doctor
