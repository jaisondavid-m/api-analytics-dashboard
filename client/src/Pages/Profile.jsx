import React, { useEffect, useState } from 'react'
import { getCurrentUser, logoutUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Loading from "../Components/Loading.jsx"
import Navbar from '../Components/Navbar.jsx'

function Profile() {

    const { user, loading, setUser } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await logoutUser()
            setUser(null)
            navigate("/home")
        } catch (err) {
            alert("Logout Failed")
        }
    }
    if (loading) return <Loading />
    if (!user) {
        navigate("/login")
        return null
    }

    return (
        <div className='h-screen'>
            <Navbar/>
            <div className='cursor-pointer h-screen bg-gray-100 flex items-center justify-center px-4'>
            <motion.div
                className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border-2 border-blue-500'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className='flex flex-col items-center'>
                    <div className='w-20 h-20 rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold'>
                        <p className='font-bold text-4xl'>{user?.name?.charAt(0).toUpperCase()}</p>
                    </div>
                    <h2 className='mt-4 text-xl font-semibold'>{user.name}</h2>
                    <p className='text-gray-500 text-sm'>@{user.user_id}</p>
                </div>
                <div className='mt-6 space-y-4'>
                    <div className='flex justify-between'>
                        <span className='text-gray-500'>Role</span>
                        <span className='font-medium capitalize'>{user.role}</span>
                    </div>
                    <div className='flex justify-between'>
                        <span className='text-gray-500'>Last Login</span>
                        <span className='font-medium'>
                            {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : "N/A"}
                        </span>
                    </div>
                </div>
                <div className='my-6 border-t'/>
                <div className='space-y-3 flex justify-center flex-col'>
                    <motion.button
                        whileTap={{scale:0.95}}
                        className='mx-auto w-3xs px-4 py-1 bg-indigo-500 text-white rounded-lg'
                    >
                        Edit Profile
                    </motion.button>
                    <motion.button
                        whileTap={{scale:0.95}}
                        onClick={handleLogout}
                        className='w-full bg-red-500 text-white py-1 rounded-lg cursor-pointer'
                    >
                        Logout
                    </motion.button>
                </div>
            </motion.div>
        </div>
        </div>
    )
}

export default Profile
