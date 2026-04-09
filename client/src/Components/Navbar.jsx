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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Logs", path: "/logs" },
    { name: "Profile", path: "/profile" },
  ]

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
        <div className='hidden md:flex items-center gap-6'>
          {navItems.map((item) => (
            <motion.button
              key={item.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(item.path)}
              className='text-gray-700 font-medium cursor-pointer'
            >
              {item.name}
            </motion.button>
          ))}
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#fef2f2" }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className='text-red-500 font-medium px-3 py-1 rounded hover:bg-red-50 cursor-pointer'
          >
            Logout
          </motion.button>
        </div>
        <div className='md:hidden relative' ref={menuRef}>
          <button
            onClick={() => setOpen(!open)}
            className='flex flex-col gap-1.5 w-6 h-5 justify-center items-center cursor-pointer'
          >
            <span className={`h-0.5 w-full bg-gray-700 transition-transform ${open ? "rotate-45 translate-y-1.5" : ""}`}></span>
            <span className={`h-0.5 w-full bg-gray-700 transition-opacity ${open ? "opacity-0" : ""} `}></span>
            <span className={`h-0.5 w-full bg-gray-700 transition-transform ${open ? "-rotate-45 -translate-y-1.5" : ""} `}></span>
          </button>
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className='fixed inset-0 bg-black z-40'
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x:0 }}
                  exit={{ x:'100%' }}
                  transition={{ type:'spring' , stiffness:300 , damping:30 }}
                  className='fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 flex flex-colp-6 gap=4'
                  ref={menuRef}
                >
                  {navItems.map((item) => (
                    <motion.button
                      key={item.name}
                      whileHover={{ backgroundColor: "#f3f4f6" }}
                      onClick={() => {
                        navigate(item.path)
                        setOpen(false)
                      }}
                      className='text-gray-700 font-medium px-3 py-2 text-left rounded'
                    >
                      {item.name}
                    </motion.button>
                  ))}
                  <motion.button
                    whileHover={{ backgroundColor: "#fef2f2" }}
                    onClick={handleLogout}
                    className='text-red-500 font-medium px-3 py-2 text-left rounded'
                  >
                    Log Out
                  </motion.button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default Navbar
