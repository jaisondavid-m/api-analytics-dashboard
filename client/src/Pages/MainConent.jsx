import React from 'react'
import LogSide from '../Components/LogSide'
import ReqSide from '../Components/ReqSide'
import Navbar from '../Components/Navbar'

function MainConent() {
    return (
        <div className='h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1'>
                <LogSide />
                <ReqSide />
            </div>
        </div>
    )
}

export default MainConent