import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div className='h-screen flex flex-col bg-gradient-to-r from-blue-600 to-indigo-700 text-white'>
        <Navbar/>
        <div className='flex flex-1 flex-col justify-center items-center text-center px-6 md:px-12'>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">Monitor All Backend Logs</h1>
          <p className='text-gray-100 text-lg md:text-lg md:text-xl max-w-sl mb-8'>
            Track API requests , debug issues and analayze user activity in real time
          </p>
          <Link to='/logs' className='px-10 py-4 md:px-12 md:py-5 bg-gradient-to-r from-green-400 to-blue-500 text-lg md:text-xl font-semibold rounded-2xl shadow-lg shadow-blue-900/50 transform transition duration-300 hover:scale-105 hover:brightness-110'>
            View Logs
          </Link>
        </div>
    </div>
  )
}

export default HeroSection