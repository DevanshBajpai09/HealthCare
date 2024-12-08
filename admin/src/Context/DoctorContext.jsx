import { createContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";


export const DoctorContext = createContext()

const DoctorContextProvider=(props)=>{
    const backendURL = import.meta.env.VITE_BACKEND_URL
      
    
    const [dtoken, setdtoken] = useState(localStorage.getItem('dtoken')?localStorage.getItem('dtoken'):'')
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setprofileData] = useState(false)
    const [months] = useState(["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"])

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]

  }

    const getAppointment = async()=>{
        try{

            const {data} = await axios.get(backendURL + '/api/doctor/appointment-doctor',{headers:{dtoken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
                
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)

        }
    }
    const currencySymbol ='$'

    const calculateAge = (dob)=>{
        const today = new Date()
        const birthDate = new Date(dob)

        let age = today.getFullYear()-birthDate.getFullYear()
        return age


    }

    const completeappointment =async(appointmentId)=>{
        try{
            const {data} = await axios.post(backendURL + '/api/doctor/appointment-complete',{appointmentId} , {headers:{dtoken}})
            if(data.success){
                toast.success(data.message)
                getAppointment()
                
            }else{
                toast.error(data.message)
            }
        
    
        
        }catch(error){
            console.log(error)
            toast.error(error.message)
    }
}


    const cancelappointment =async(appointmentId)=>{
        try{
            const {data} = await axios.post(backendURL + '/api/doctor/appointment-cancel' , {appointmentId},{headers:{dtoken}})
            if(data.success){
                toast.success(data.message)
                getAppointment()

                
            }else{
                toast.error(data.message)
            }
        
    
        
        }catch(error){
            console.log(error)
            toast.error(error.message)
    }


}


const getDashboredData = async()=>{
    try{
        const {data} = await axios.get(backendURL + '/api/doctor/doctor-dashbored' , {headers:{dtoken}})
        if(data.success){
            setDashData(data.dashData)
            console.log(data.dashData)

            
        }else{
            toast.error(data.message)
        }

    }catch(error){
        console.log(error)
            toast.error(error.message)

    }
}

const getProfileDoctor = async()=>{
    try{
        const{data} = await axios.get(backendURL + '/api/doctor/doctor-profile' , {headers:{dtoken}})
        if(data.success){
            setprofileData(data.profileData)
            
            console.log(data.profileData)

            
        }else{
            toast.error(data.message)
        }


    }catch(error){

        console.log(error)
        toast.error(error.message)
    }
}


const updateDoctor = async()=>{
    try{
        const{data} = await axios.post(backendURL + '/api/doctor/update-doctor' , {headers:{dtoken}})
        if(data.success){
            
            console.log(data.dashData)

            
        }else{
            toast.error(data.message)
        }


    }catch(error){

        console.log(error)
        toast.error(error.message)
    }
}


    
    const value={
        dtoken,
        setdtoken,
        backendURL,
        getAppointment,
        appointments,
        setAppointments,
        calculateAge,
        currencySymbol,
        slotDateFormate,
        cancelappointment,
        completeappointment,
        getDashboredData,
        setDashData,
        dashData,
        profileData,
        setprofileData,
        getProfileDoctor



    }

    return(
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider