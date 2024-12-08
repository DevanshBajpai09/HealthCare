import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {token , setToken , backendURL} =useContext(AppContext)
  const [state, setstate] = useState('Sign up')
  const [email, setemail] = useState('')

  const [password, setpassword] = useState('')
  const [name, setname] = useState('')

  const navigate = useNavigate()



  const onSubmitHandler =async(event)=>{
    event.preventDefault()
    try{
      if(state === 'Sign up'){
        const {data} = await axios.post(backendURL + '/api/user/register' , {name , password , email})
        if(data.success){
          localStorage.setItem('token' , data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendURL + '/api/user/login' , {password , email})
        if(data.success){
          localStorage.setItem('token' , data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }

      }

    }catch(error){
      toast.error(error.message)

    }

  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }

  },[token])
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign up' ? "Create Account":"Login"}</p>
        <p>Please {state === 'Sign up' ? "Sign up" : "log in"} to book  appointment </p>
        {
          state === 'Sign up' && <div className='w-full'>
          <p>Full Name</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="text" onChange={(e)=>setname(e.target.value) } value={name} required/>
          </div>
        }
        <div className='w-full'>
        <p>Email</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="email" onChange={(e)=>setemail(e.target.value) } value={email} required/>

        </div>
        <div className='w-full'>
        <p>Password</p>
        <input className='border border-zinc-300 rounded w-full p-2 mt-1' type="password" onChange={(e)=>setpassword(e.target.value) } value={password} required/>

        </div>
        <button  type="submit" className="rounded-md w-full text-base py-2  text-center  hover:scale-105 transition-all duration-300 bg-primary text-white">
        {state === 'Sign up' ? "Create Account":"Login"}</button>
        {
          state === "Sign up" 
          ? <p>Already have an account ?  <span onClick={()=>setstate('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create a new Account ? <span onClick={()=>setstate('Sign up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>


      
    </form>
  )
}

export default Login
