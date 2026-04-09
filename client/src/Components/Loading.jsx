import React from 'react'
import {motion} from "framer-motion"

function Loading({message="Loading.."}) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-75 z-50'>
        <motion.div
            className='flex flex-col items-center space-y-4'
            initial={{scale:0.8,opacity:0}}
            animate={{scale:1,opacity:1}}
            transition={{duration:0.3,ease:"easeOut"}}
        >
            <motion.div
                className='w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full'
                animate={{rotate:360}}
                transition={{repeat:Infinity,duration:1,ease:"linear"}}
            >
            </motion.div>
            <motion.p
                className='text-gray-700 text-lg font-medium'
                initial={{y:10,opacity:0}}
                animate={{y:0,opacity:1}}
                transition={{delay:0.2}}
            >
                {message}
            </motion.p>
        </motion.div>
    </div>
  )
}

export default Loading
