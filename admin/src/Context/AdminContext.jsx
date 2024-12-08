import axios from "axios";
import { createContext } from "react";

import { useState } from "react";
import toast from "react-hot-toast";




export const AdminContext = createContext()





const AdminContextProvider=(props)=>{
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [dashData, setdashData] = useState(false)
    const [doctors , setdoctors] = useState([])
    const [appointments, setappointments] = useState([])
    const [atoken, setatoken] = useState(localStorage.getItem('atoken')?localStorage.getItem('atoken'):'')
    
    
    const getallDoctors = async()=>{
        try{
            const {data} =await axios.post(backendURL + '/api/admin/all-doctor', {} , {headers:{atoken}})
            if(data.success){
                setdoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
    
    
        }catch(error){
            toast.error(error.message)
    
        }
    }

    const changeAvailability =async(docId)=>{
        try{

            const {data} = await axios.post(backendURL + '/api/admin/change-availability',{docId},{headers:{atoken}})
            if(data.success){
                toast.success(data.message)
            getallDoctors()
            }else{
                toast.error(data.message)
            }

           

        }catch(error){
            toast.error(error.message)
        }
    }

    const  getAllAppointment=async()=>{
        try{
            const{data} = await axios.get(backendURL+'/api/admin/appointments' ,{headers:{atoken}})
            if(data.success){
                setappointments(data.appointments)
                console.group(data.appointments)

            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)

        }
    }


    const cancelappointment=async(appointmentId)=>{
        try{
            const {data} = await axios.post(backendURL + '/api/admin/appointments-cancel' ,{appointmentId} , {headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointment()
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)

        }


    }

    const getDashdata = async () => {
        try {
          const { data } = await axios.get(backendURL + '/api/admin/admin-dashbored', { headers: { atoken } });
          console.log('Backend Response:', data); // Debug response
      
          if (data.success) {
            setdashData(data.dashData);
            console.log('Dashdata:', data.dashData); // Debug specific field
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error('Error Fetching Dashboard Data:', error.message);
          toast.error(error.message);
        }
      };
      
    const value={
        atoken,setatoken,
        backendURL,
        getallDoctors,
        doctors,
        changeAvailability,
        getAllAppointment,
        appointments,
        setappointments,
        cancelappointment,
        getDashdata ,dashData
        
    }
    return(
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider