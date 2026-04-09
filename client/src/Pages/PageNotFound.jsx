import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function PageNotFound() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 px-4'>
            <motion.div
                className='text-center'
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                transition={{duration:0.5,ease:"easeOut"}}
            >
                <h1 className='text-6xl font-extrabold text-blue-600'>404</h1>
                <p className='mt-4 text-xl text-gray-700'>
                    Oops! The Page You are Looking For Does Not Exists
                </p>
                <Link to='/' className='inline-block mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition'>
                Go Back Home
                </Link>
            </motion.div>
        </div>
    )
}

export default PageNotFound