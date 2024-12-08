import Login from './Pages/Login'
import './App.css'
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import { Routes , Route } from 'react-router-dom';
import AddDoctor from './Pages/Admin/AddDoctor';
import AllAppointment from './Pages/Admin/AllAppointment';
import DashBoared from './Pages/Admin/DashBoared';
import DoctorsList from './Pages/Admin/DoctorsList';
import { DoctorContext } from './Context/DoctorContext';
import DoctorDashbored from './Pages/Doctor/doctorDashbored';
import DoctorAppointment from './Pages/Doctor/doctorAppointment';
import DoctorProfile from './Pages/Doctor/doctorProfile';


function App() {

  const {atoken} = useContext(AdminContext)
  const {dtoken} = useContext(DoctorContext)
  

  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
      
      <Toaster position="top-right"/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
         

          {/* Admin Routes */}
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboared' element={<DashBoared/>}/>
          <Route path='/all-appointment' element={<AllAppointment/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctors-list' element={<DoctorsList/>}/>

           {/* Doctor Routes */}
          <Route path='/doctors-dashbored' element={<DoctorDashbored/>}/>
          <Route path='/doctors-appointment' element={<DoctorAppointment/>}/>
          <Route path='/doctors-profile' element={<DoctorProfile/>}/>

        </Routes>

      </div>
    </div>
  ):(
    <>
    <Login/>
    <Toaster position="top-right"/>
    </>
  )
}

export default App
