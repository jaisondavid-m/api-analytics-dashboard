import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function HeroSection() {
  return (
    <div className='min-h-screen relative overflow-hidden bg-gradient-br from-[#0f172a] via-[#1e3a8a] to-[#4f4f6e5'>
      <div className='absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-blue-500 opacity-30 rounded-full blur-3xl'></div>
      <div className='absolute bottom-[-100px] right-[100px] w-[300px] h-[300px] bg-indigo-500 opacity-30 rounded-full blur-3xl'></div>
      <Navbar />
      <div className='flex flex-col justify-center items-center text-center px-6 min-h-[80vh]'>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl"
        >
          Monitor All Backend Logs{" "}
          <span className='bg-blue-400 bg-clip-text text-transparent'>
            Like a Pro
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className='mt-6 text-gray-500 text-lg md:text-xl max-w-2xl'
        >
          Track API requests , debug issues and analayze user activity in real time - all in one powerful dashboard
        </motion.p>
        <div className='flex flex-col gap-y-12'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='mt-10'
          >
            <Link to='/logs' className='px-10 py-4 md:px-12 md:py-5 bg-blue-400 text-lg md:text-xl font-semibold rounded-2xl shadow-lg shadow-blue-900/50 transform transition duration-300 hover:scale-105 hover:brightness-110 text-white'>
              View Logs →
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link to='/analytics' className='px-10 py-4 md:px-12 md:py-5 bg-blue-400 text-lg md:text-xl font-semibold rounded-2xl shadow-lg shadow-blue-900/50 transform transition duration-300 hover:scale-105 hover:brightness-110 text-white'>
              View Analytics →
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

export default HeroSection