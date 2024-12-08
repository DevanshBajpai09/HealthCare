import { createContext , useState } from "react";
import axios from 'axios'
import { useEffect } from "react";
import {toast} from 'react-hot-toast'


export const AppContext = createContext()

const AppProvider = (props)=>{
    const currencySymbol = '$'
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData, setUserData] = useState(false)

    
    const getDoctorsData = async ()=>{
        try{
            const {data} = await axios.get(backendURL + '/api/doctor/list')
            if(data.success){
                setDoctors(data.doctors)


            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)
            console.log(error)

        }
    }
    
    
    
    
    
    const loadUserData = async()=>{
        try{
            const {data} = await axios.get(backendURL + '/api/user/get-profile' , {headers:{token}})
            if(data.success){
                setUserData(data.userData)
            }else{
                toast.error(data.message)
            }

        }catch(error){
            toast.error(error.message)
            console.log(error)

        }
    }
    
    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token,
        setToken,
        backendURL,
        userData,
        setUserData,
        loadUserData,

    }
    useEffect(()=>{
        getDoctorsData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    
    useEffect(()=>{
        if(token){
            loadUserData()
        }else{
            setUserData(false)
            
        }
    
    },[token])

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppProvider