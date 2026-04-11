import React, { useEffect, useState } from 'react'
import {  logoutUser } from '../api/auth'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User , Shield , Clock , LogOut , Edit } from "lucide-react"
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
    if (loading) return (
        <div className='h-screen flex items-center justify-center'>
            <Loading />
        </div>
    )
    if (!user) {
        navigate("/login")
        return null
    }

    return (
        <div className='h-screen'>
            <Navbar/>
            <div className='h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4'>
            <motion.div
                className='bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md border border-gray-100 relative overflow-hidden'
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className='absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl'></div>
                <div className='flex flex-col items-center'>
                    <div className='w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white flex items-center justify-center shadow-lg'>
                        <User size={32} />
                    </div>
                    <h2 className='mt-4 text2xl font-bold text-gray-800'>{user.name}</h2>
                    <p className='text-gray-500 text-sm flex items-center gap-1'><User size={14} />@{user.user_id}</p>
                </div>
                <div className='mt-6 space-y-4'>
                    <div className='flex justify-between items-center bg-gray-50 p-3 rounded-lg'>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <Shield size={16}/> Role
                        </div>
                        <span className='font-medium capitalize text-gray-500'>{user.role}</span>
                    </div>
                    <div className='flex items-center justify-between bg-gray-50 p-3 rounded-lg'>
                        <div className='flex items-center gap-2 text-gray-500'>
                            <Clock size={16}/> Last Login
                        </div>
                        <span className='font-medium text-gray-800 text-sm'>
                            {user.last_login_at ? new Date(user.last_login_at).toLocaleString() : "N/A"}
                        </span>
                    </div>
                </div>
                <div className='my-6 border-t border-gray-200'/>
                <div className='space-y-3'>
                    <motion.button
                        whileTap={{scale:0.95}}
                        className='w-full flex items-center justify-center px-4 py-2 gap-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition'
                    >
                        <Edit size={16}/> Edit Profile
                    </motion.button>
                    <motion.button
                        whileTap={{scale:0.95}}
                        onClick={()=>{handleLogout,alert("Will be added an future ! stay connected")}}
                        className='w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg cursor-pointer transition'
                    >
                        <LogOut size={16}/> Logout
                    </motion.button>
                </div>
            </motion.div>
        </div>
        </div>
    )
}

export default Profile
