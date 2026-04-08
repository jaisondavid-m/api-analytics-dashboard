import React, { useState } from 'react'
import { logoutUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const [open,setOpen]=useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const handleLogout = async ()=> {
    try {
      await logoutUser()
      setOpen(false)
      setUser(null)
      navigate("/",{replace:true})
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div className='w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50'>
      <div className='mx-auto flex justify-between items-center px-6 py-3'>
        <div className='flex items-center gap-3'>
            <div className='w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow'>A</div>
            <h1 className='text-xl font-bold text-gray-800 tracking-wide'>API ANALYTICS</h1>
        </div>
        <div className="flex items-center gap-4">
            <span className='hidden sm:inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700'>● Live</span>
            <div onClick={()=>setOpen(!open)} className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-3 py-1.5 rounded-full cursor-pointer'>
                <div className='w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold'>A</div>
                <span className='text-sm font-medium text-gray-700'>Admin</span>
            </div>
        </div>
      </div>
      {open && (
        <div className='absolute right-6 top-14 bg-white shadow-md rounded-lg p-2'>
          <button onClick={handleLogout} className='text-sm text-red-500 hover:bg-gray-100 px-2 py-1 rounded w-full text-left'>
            Logout
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
