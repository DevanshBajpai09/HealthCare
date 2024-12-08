import React , {useState} from 'react'
import { assets } from '../../assets/assets_admin/assets'
import { useContext } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { toast} from 'react-hot-toast'
import axios from 'axios'

const AddDoctor = () => {

  const [docimg, setdocImg] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [experience, setExperience] = useState('1 year')
  const [fees, setFees] = useState('')
  const [about, setAbout] = useState('')  
  const [speciality, setSpeciality] = useState('General physician')  
  const [degree, setDegree] = useState('')  
  const [address1, setAddress1] = useState('')  
  const [address2, setAddress2] = useState('') 


  const {backendURL , atoken} = useContext(AdminContext)
  
  
  const onsubmitHandler=async(event)=>{
    event.preventDefault()
    try{
      if(!docimg){
        return toast.error('Image Not Found')
        
      }
      const formData = new FormData()

      formData.append('image' ,docimg)
      formData.append('name' ,name)
      formData.append('email' ,email)
      formData.append('password' ,password)
      formData.append('experience' ,experience)
      formData.append('fees' ,Number(fees))
      formData.append('about' ,about)
      formData.append('speciality' ,speciality)
      formData.append('degree' ,degree)
      formData.append('address' ,JSON.stringify({line1:address1 , line2:address2}))
      
      // consolelog form data
      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`)
      })
      const {data} =await axios.post(backendURL + '/api/admin/add-doctor' , formData,{headers:{atoken}})
      if(data.success){
        toast.success(data.message)
        setdocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAddress2('')
        setDegree('')
        setAbout('')
        setFees('')
        
      }
      else{
        toast.error(data.message)
      }

    }catch(error){
      toast.error(error.message)
      console.log(error)
    }

  }





  return (
    <form onSubmit={onsubmitHandler} className='m-5 w-full'>
      
      <p className='mb-3 text-lg font-medium'>Add Doctor</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
        <div className='flex items-center gap-4 mb-8 text-gray-500'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-100 rounded-full cursor-pointer' src={docimg ? URL.createObjectURL(docimg) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setdocImg(e.target.files[0])} type="file" id='doc-img' hidden />
          <p>Upload Doctor <br /> Picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Name</p>
              <input onChange={(e)=>setName(e.target.value)} value={name} className='border rounded px-3 py-2' type="text" placeholder='name' required />

            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Email</p>
              <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border rounded px-3 py-2' type="email" placeholder='email' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Password</p>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border rounded px-3 py-2' type="password" placeholder='password' required />
            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Doctor Experience</p>
              <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border rounded px-3 py-2' name="" id="">
                <option value="1 year">1 year</option>
                <option value="2 year">2 year</option>
                <option value="3 year">3 year</option>
                <option value="4 year">4 year</option>
                <option value="5 year">5 year</option>
                <option value="6 year">6 year</option>
                <option value="7 year">7 year</option>
                <option value="8 year">8 year</option>
                <option value="9 year">9 year</option>
                <option value="10 year">10 year</option>


              </select>

            </div>
            <div className='flex-1 flex flex-col gap-1'>
              <p>Fees</p>
              <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border rounded px-3 py-2' type="number" placeholder='fees' required />
            </div>

          </div>
          <div className='w-full lg:flex-1 flex flex-col gap-4'>

          <div className='flex-1 flex flex-col gap-1'>
            <p>Speciality</p>
            <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border rounded px-3 py-2' name="" id="">
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterolohist">Gastroenterologist</option>
            </select>
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Education Details</p>
            <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border rounded px-3 py-2' type="text" placeholder='education' required />
          </div>
          <div className='flex-1 flex flex-col gap-1'>
            <p>Address</p>
            <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border rounded px-3 py-2' type="text" placeholder='address 1' required />
            <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border rounded px-3 py-2' type="text" placeholder='address 2' required />
          </div>

        </div>
          </div>
        <div>
          <p className='mt-4 pb-2'>About Me</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='w-full px-4 pt-2 border rounded'  type="text" placeholder='write about doctor' rows={5} required />
        </div>
        <button type="submit" className="rounded-full  text-base px-10  py-3 mt-3  text-center hover:scale-105 transition-all duration-300 bg-primary text-white">
          Add Doctor
        </button>
      </div>

    </form>
  )
}

export default AddDoctor