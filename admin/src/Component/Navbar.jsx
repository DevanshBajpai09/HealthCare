import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../Context/DoctorContext'

const Navbar = () => {
    const {atoken , setatoken} = useContext(AdminContext)
    const {dtoken ,setdtoken} = useContext(DoctorContext)
    const navigate = useNavigate()
    const logout =()=>{
        navigate('/')
        atoken && setatoken('')
        atoken && localStorage.removeItem(atoken)
        dtoken && setdtoken('')
        dtoken && localStorage.removeItem(dtoken)
    }
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>

        <img className='w-[50px] h-[50px] cursor-pointer'  src={assets.admin_logo} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? 'Admin' :'Doctor'}</p>
        </div>
        <button type="submit" onClick={logout} className="rounded-full  text-base px-10  py-2 mt-1 text-center hover:scale-105 transition-all duration-300 bg-primary text-white">
                    Logout
                </button>

      
    </div>
  )
}

export default Navbar
