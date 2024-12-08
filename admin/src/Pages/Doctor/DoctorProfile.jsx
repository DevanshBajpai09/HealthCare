import React, { useContext, useEffect ,useState } from 'react'
import { DoctorContext } from '../../Context/DoctorContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const DoctorProfile = () => {
    const {dtoken , profileData,setprofileData,getProfileDoctor,backendURL,currencySymbol} = useContext(DoctorContext)
    const [isEdit, setisEdit] = useState(false)
    useEffect(()=>{
        if(dtoken){
            getProfileDoctor()
        }
    },[dtoken])

    const updateProfile = async()=>{
        try{

            const updateData = {
                address:profileData.address,
                fees:profileData.fees,
                available:profileData.available
            }

            const {data} = await  axios.post(backendURL + '/api/doctor/doctor-update' , updateData ,{headers:{dtoken}}) 
            if(data.success){
                toast.success(data.message)
                setisEdit(false)
                setprofileData(data.updatedProfile)
                getProfileDoctor()
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)
            console.log(error)

        }
    }
  return profileData && (
    <div>
        <div className='flex flex-col gap-4 m-5'>
            <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-150 rounded-lg px-8 py-7 mx-4 bg-white'>
            {/* docinfo : degree frrs  */}
            <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>
                {profileData.name}

            </p>
            <div className='flex items-center gap-2 mt-1 text-gray-600'>
                <p>{profileData.degree} - {profileData.speciality}</p>
                <button className='py-0.5 px-2 text-xs border rounded-full'>{profileData.experience}</button>
            </div>

            {/* Doc about text  */}
            <div>
                <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About</p>
                <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{profileData.about}</p>
            </div>
            <p className='text-gray-600 font-medium mt-4'>Appointment Fees : <span className='text-gray-800'>{currencySymbol} {isEdit? <input type="number" onChange={(e)=>setprofileData(prev=>({...prev,fees:e.target.value}))} value={profileData.fees} />:profileData.fees}</span></p>
            <div className='flex gap-2 py-2'>
                <p>Address:</p>
                <p className='text-sm'>
                    {isEdit? <input type="text" onChange={(e)=>setprofileData(prev=>({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} />:profileData.address.line1}
                    <br />
                    {isEdit? <input type="text" onChange={(e)=>setprofileData(prev=>({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2} />:profileData.address.line2}

                </p>
            </div>
            <div className='flex gap-1 pt-2'>
                <input onChange={()=>isEdit && setprofileData(prev=>({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" />
                <label htmlFor="">Available</label>
            </div>
            {
                isEdit 
                ?<button type='submit' onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
                :<button type='submit' onClick={()=>setisEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>


            }
        </div>
      
    </div>
  )
}

export default DoctorProfile