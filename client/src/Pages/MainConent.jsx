import React from 'react'
import LogSide from '../Components/LogSide'
import ReqSide from '../Components/ReqSide'
import Navbar from '../Components/Navbar'

function MainConent() {
    return (
        <div className='h-screen flex flex-col overflow-hidden bg-[#0b1220]'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <div className='w-[50%] border-r border-gray-800'>
                    <LogSide />
                </div>
                <div className='w-[50%]'>
                    <ReqSide />
                </div>
            </div>
        </div>
    )
}

export default MainConent