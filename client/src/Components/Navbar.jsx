import React, { useEffect, useRef, useState } from 'react'
import { logoutUser } from '../api/auth'
import { replace, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { setUser } = useAuth()
  const menuRef = useRef(null)

  const handleLogout = async () => {
    try {
      await logoutUser()
      setOpen(false)
      setUser(null)
      navigate("/", { replace: true })
    } catch (error) {
      console.error(error)
    }
  }

  const goHome = () => {
    navigate("/", { replace: true })
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className='w-full bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50'
    >
      <div className='mx-auto flex justify-between items-center px-6 py-3'>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='flex items-center gap-3 cursor-pointer' onClick={goHome}
        >
          <div className='w-9 h-9 flex items-center justify-center rounded-xl bg-blue-600 text-white font-bold shadow'>A</div>
          <h1 className='text-xl font-bold text-gray-800 tracking-wide'>API ANALYTICS</h1>
        </motion.div>
        <div className="flex items-center gap-4">
          <motion.span
            animate={{ opacity: [0.6, 1, 0.6] }}
            className='hidden sm:inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700'
          >● Live
          </motion.span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(!open)} className='flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition px-3 py-1.5 rounded-full cursor-pointer'
          >
            <div className='w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-semibold'>A</div>
            <span className='text-sm font-medium text-gray-700'>Admin</span>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div 
            className='absolute right-6 top-14 bg-white shadow-md rounded-lg p-2'
            initial={{opacity:0,scale:0.9,y:-10}}
            animate={{opacity:1,scale:1,y:0}}
            exit={{opacity:0,scale:0.9,y:-10}}
            transition={{duration:0.15}}
          >
            <motion.button
             whileHover={{backgroundColor:"#f3f4f6"}}
             onClick={handleLogout} 
             className='text-sm text-red-500 hover:bg-gray-100 px-2 py-1 rounded w-full text-left'
            >
              Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}

export default Navbar
