import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { DoctorContext } from '../Context/DoctorContext'

const Login = () => {
    const [state, setstate] = useState('Admin')

    const { setatoken, backendURL } = useContext(AdminContext)
    const { setdtoken } = useContext(DoctorContext)

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')


    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendURL + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('atoken', data.token)
                    setatoken(data.token)
                } else {
                    toast.error(data.message)
                }

            }else{
                const {data} = await axios.post(backendURL + '/api/doctor/login-doctor', {email,password})
                if (data.success) {
                    localStorage.setItem('dtoken', data.token)
                    setdtoken(data.token)
                    console.log(data.token)
                } else {
                    toast.error(data.message)
                }

            }

        } catch (error) {
            console.log(error)
        }


    }

    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center mt-20'>
            <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96  border rounded-xl text-[#5E5E5E] shadow-lg text-sm'>
                <p className='text-2xl  font-semibold m-auto'><span className='text-primary'>{state}</span>Login</p>
                <div className='w-full '>
                    <p>Email</p>
                    <input onChange={(e) => setemail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required autoComplete='
                email'/>
                </div>
                <div className='w-full'>
                    <p>Password</p>
                    <input onChange={(e) => setpassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required autoComplete='password' />
                </div>
                <button type="submit" className="rounded-md w-full text-base  py-2 mt-2 text-center hover:scale-105 transition-all duration-300 bg-primary text-white">
                    Login
                </button>
                {
                    state === 'Admin'
                        ? <p>Doctor Login ? <span onClick={() => setstate('Doctor')} className='cursor-pointer text-primary underline'>Click here</span></p>
                        : <p>Admin Login ?<span onClick={() => setstate('Admin')} className='cursor-pointer text-primary underline'>Click here</span></p>
                }
            </div>


        </form>
    )
}

export default Login
