import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <div className='h-screen 
     text-white flex flex-col'>
        <Navbar/>
        <div className='flex flex-1 flex-col justify-center items-center text-center px-6'>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">Monitor All Backend Logs</h1>
          <p>Track API requests , debug issues and analayze user activity in real time</p>
          <Link to='/logs' className='px-8 py-3 m-5 cursor-pointer bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-xl text-lg font-semibold shadow-lg hover:scale-105'>
            View Logs
          </Link>
        </div>
    </div>
  )
}

export default HeroSection
