import React , {useContext, useState} from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {

  const { userData, setUserData, backendURL, loadUserData, token } = useContext(AppContext);


  const [isedit, setisedit] = useState(false)

  const [image, setImage] = useState(false)


  const updateUserProfileDate = async(event)=>{
    event.preventDefault()

    try{
      const formData = new FormData()
      formData.append('name' ,userData.name)
      formData.append('phone' ,userData.phone)
      formData.append('address' ,JSON.stringify(userData.address))
      formData.append('gender' ,userData.gender)
      
      formData.append('dob' ,userData.dob)

      image && formData.append('image' , image)

      const {data} = await axios.post(backendURL + '/api/user/update-profile' , formData , {headers:{token}})

      if(data.success){
        toast.success(data.message)
        await loadUserData()
        setisedit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }

    }catch(error){
      console.log(error)
      toast.error(error.message)

    }

    
  }

  // if (!userdata) {
  //   return <div>Loading...</div>; // Fallback while userdata is being fetched.
  // }
  
  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm mt-10 mx-10'>
      {
        isedit ? 
        <label htmlFor="image">
          <div className='inline-block relative cursor-pointer'>
            <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
          </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
        </label>
        : <img className='w-36 rounded' src={userData.image} alt="" />
      }
      

      {
        isedit ? 
        <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4 rounded-lg' type="text" value={userData.name} onChange={(e)=>setUserData(prev=>({...prev,name:e.target.value}))} />
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>Contact Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone :</p>
          {
        isedit ? 
        <input className='bg-gray-100 max-w-52 rounded-lg' type="text" value={userData.phone} onChange={(e)=>setUserData(prev=>({...prev,phone:e.target.value}))} />
        : <p className='text-blue-400'>{userData.phone}</p>
      }
      <p className='font-medium'>Address:</p>
      {
         isedit ? 
         <p>
          <input className='bg-gray-50 rounded-lg' onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address , line1:e.target.value}}))} value={userData.address.line1} type="text" />
          <br />
          <input className='bg-gray-50 mt-3 rounded-lg' onChange={(e)=>setUserData(prev=>({...prev,address:{...prev.address , line2:e.target.value}}))} value={userData.address.line2}type="text" />
         </p>
         : <p className='text-gray-500'>{userData.address.line1}
         <br />
         {userData.address.line2}
         </p>
      }
          
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender: </p>
          {
        isedit ? 
        <select className='max-w-[110px] bg-gray-100 rounded-lg' onChange={(e)=>setUserData(prev=>({...prev , gender:e.target.value}))} value={userData.gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        : <p className='text-gray-400'>{userData.gender}</p>
      }

      <p className='font-medium'>Birthday:</p>
      {
        isedit?
        <input className='max-w-[150px] bg-gray-100 rounded-lg' type="date" onChange={(e)=>setUserData(prev=>({...prev , dob:e.target.value}))} value={userData.dob} />
        : <p className='text-gray-400'>{userData.dob}</p>
      }
        </div>
      </div>
      <div className='mt-10'>
        {
          isedit?
          <button type="button" onClick={updateUserProfileDate} className="rounded-full text-md px-8 py-2 text-center hover:bg-primary border-primary hover:text-white transition-all border ">
                    Save Information
                    
                </button>
          :
          <button type="button" onClick={()=>setisedit(true)} className="rounded-full text-md px-8 py-2 text-center hover:bg-primary border-primary hover:text-white transition-all border">
                    Edit
                </button>
        }
      </div>
      
    </div>
  )
}

export default Profile  