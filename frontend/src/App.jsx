import React from 'react'
import {Routes , Route} from 'react-router-dom'
import Home from './pages/Home'
import Doctor from './pages/Doctor'
import Contact from './pages/Contact'
import Profile from './pages/Profile'
import Appointment from './pages/Appointment'
import About from './pages/About'
import Login from './pages/Login'
import My_appointment from './pages/My_appointment'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import { Toaster } from 'react-hot-toast';
import Invoice from './Component/Invoice'


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
       <Toaster/>
      <Navbar/>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctor/>}/>
        <Route path='/doctors/:speciality' element={<Doctor/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/appointment/:docId' element={<Appointment/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/myappointment' element={<My_appointment/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/invoice' element={<Invoice/>}/>



       
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
