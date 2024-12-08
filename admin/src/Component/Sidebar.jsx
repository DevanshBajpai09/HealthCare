import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets_admin/assets'
import { DoctorContext } from '../Context/DoctorContext'

const Sidebar = () => {
  const {atoken} = useContext(AdminContext)
  const {dtoken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
      {
        atoken &&
        <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F2F2] border-r-4 border-primary':''}`} to='/admin-dashboared'>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashbored</p> 
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F2F2] border-r-4 border-primary':''}`} to='/all-appointment'>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointments</p> 
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F2F2] border-r-4 border-primary':''}`} to='/add-doctor'>
            <img src={assets.add_icon} alt="" />
            <p className='hidden md:block'>Add Doctor</p> 
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F2F2] border-r-4 border-primary':''}`} to='/doctors-list'>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Doctor List</p> 
          </NavLink>
        </ul>
      }
       {
        dtoken &&
        <ul className='text-[#515151] mt-5'>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F2F2] border-r-4 border-primary':''}`} to='/doctors-dashbored'>
            <img src={assets.home_icon} alt="" />
            <p className='hidden md:block'>Dashbored</p> 
          </NavLink>
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F2F2] border-r-4 border-primary':''}`} to='/doctors-appointment'>
            <img src={assets.appointment_icon} alt="" />
            <p className='hidden md:block'>Appointments</p> 
          </NavLink>
          
          <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive?'bg-[#F2F2F2] border-r-4 border-primary':''}`} to='/doctors-profile'>
            <img src={assets.people_icon} alt="" />
            <p className='hidden md:block'>Profile</p> 
          </NavLink>
        </ul>
      }
      
    </div>
  )
}

export default Sidebar
