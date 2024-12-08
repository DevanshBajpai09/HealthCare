import React, { useContext } from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AppContext } from '../context/AppContext'



const Navbar = () => {
  const [showMenu, setshowMenu] = useState(false)
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => setDropdownVisible(!dropdownVisible);


  const {token , setToken ,userData} = useContext(AppContext)

  const Logout =()=>{
    setToken(false)
    localStorage.removeItem('token')
  }


  // Navigate for create account
  const navigate = useNavigate();
  return (
    <>


      <nav className='border-b-2 border-black'>
        <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />

                </svg>
              </button>
            </div>
            <div className="flex flex-1  sm:items-stretch sm:justify-start mx-auto">
              <div className="flex shrink-0 items-center">
                <NavLink to="/">
                  <img className="h-12 w-auto" src={assets.logo} alt="Logo" />
                </NavLink>
              </div>


              <div className="hidden sm:ml-6 sm:block text-center">
                <div className="flex space-x-4">
                  <NavLink to="/" className="rounded-md px-3 py-2 mt-1 text-sm font-medium text-black hover:bg-gray-700 hover:text-white" >Home</NavLink>
                  <NavLink to="/doctors" className="rounded-md px-3 py-2 mt-1 text-sm font-medium text-black hover:bg-gray-700 hover:text-white">Doctors</NavLink>
                  <NavLink to="/about" className="rounded-md px-3 py-2 mt-1 text-sm font-medium text-black hover:bg-gray-700 hover:text-white">About</NavLink>
                  <NavLink to="/contact" className="rounded-md px-3 py-2 mt-1 text-sm font-medium text-black hover:bg-gray-700 hover:text-white">Contact</NavLink>
              <NavLink to="" className="text-black border border-gray-400 bg-white rounded-full px-3 py-0.5 mt-1 text-sm font-medium">Admin Panel</NavLink>
                </div>
              </div>

            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

              {
                token  && userData ?
                  <div className="hs-dropdown relative inline-flex">
                    <button
                      onClick={toggleDropdown}
                      id="hs-dropdown-custom-trigger"
                      type="button"
                      className="hs-dropdown-toggle py-1 ps-1 pe-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-full border"
                      aria-haspopup="menu"
                      aria-expanded={dropdownVisible}
                    >
                      <img className="w-8 h-auto rounded-full" src={userData.image} alt="Profile" />
                      <span className="text-black font-medium truncate max-w-[7.5rem]">{userData.name}</span>
                      <svg
                        className={`size-4 transition-transform ${dropdownVisible ? "rotate-180" : ""
                          }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      className={`hs-dropdown-menu ${dropdownVisible ? "block" : "hidden"
                        } text-black min-w-60 shadow-md rounded-lg mt-2 absolute`}
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-dropdown-custom-trigger"
                    >
                      <div className="p-1 space-y-0.5">
                        <a
                          onClick={() => navigate("profile")}
                          className="flex items-center gap-x-3.5 py-2 px-3 cursor-pointer rounded-lg text-sm text-black"
                        >
                          My Profile
                        </a>
                        <a
                          onClick={() => navigate("myappointment")}
                          className="flex items-center gap-x-3.5 py-2 px-3 cursor-pointer rounded-lg text-sm text-black"
                        >
                          My Appointment
                        </a>
                        <a
                          onClick={Logout}
                          className="flex items-center gap-x-3.5 py-2 px-3 cursor-pointer rounded-lg text-sm text-black"
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </div>

                  : <button onClick={() => navigate('/login')} type="button" className="relative rounded-md px-3 py-2 text-black hover:text-white hover:bg-gray-700">
                    Create Account
                  </button>
              }
              <img onClick={()=>setshowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="" />
              {/* mobile menu */}
              <div className={` ${showMenu ? 'fixed w-full':'h-0 w-0'} md:hidden  right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
                <div className='flex items-center justify-between px-20 py-7'>
                  <img className='w-16' src={assets.logo} alt="" />
                  <img className='w-7' onClick={()=>setshowMenu(false)} src={assets.cross_icon} alt="" />
                </div>
                <ul className='flex flex-col items-center gap-2 mt-5 px-2 text-lg font-medium'>
                  <NavLink onClick={()=>setshowMenu(false)}  to='/'><p className='px-4 py-2 rounded inline-block'>Home</p></NavLink>
                  <NavLink onClick={()=>setshowMenu(false)}  to='/doctors'><p className='px-4 py-2 rounded inline-block'>All Doctors</p></NavLink>
                  <NavLink onClick={()=>setshowMenu(false)}  to='/about'><p className='px-4 py-2 rounded inline-block'>About</p></NavLink>
                  <NavLink onClick={()=>setshowMenu(false)}  to='/contact'><p className='px-4 py-2 rounded inline-block'>Contact</p></NavLink>
                </ul>
              </div>

            </div>

          </div>
        </div>

      

       
      </nav>




    </>
  )
}

export default Navbar
