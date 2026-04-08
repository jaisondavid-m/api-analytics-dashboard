import React from 'react'
import LogSide from '../Components/LogSide'
import ReqSide from '../Components/ReqSide'
import Navbar from '../Components/Navbar'

function MainConent() {
    return (
        <div className='h-screen flex flex-col overflow-hidden'>
            <Navbar />
            <div className='flex flex-1 overflow-hidden'>
                <LogSide />
                <ReqSide />
            </div>
        </div>
    )
}

export default MainConent