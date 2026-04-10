import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { UserRequests } from '../api/analytics'
import { useAuth } from '../context/AuthContext'
import Loading from '../Components/Loading'

function MyUsage() {
    const [data,setData] = useState(null)
    const { user } = useAuth()
    const userID = user.id

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res = await UserRequests(userID)
                setData(res.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchData()
    },[])

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-100 to-gray-200'>
        <div className='p-6'>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold text-gray-800'>My Usage</h1>
                <p className='text-sm text-gray-500 mt-1'>
                    OverView of Your API activity and latest request
                </p>
            </div>
            
            {!data ? (
                <Loading/>
            ) : (
                <>
                 <div className='relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 mb-6 shadow-lg'>
                    <h2 className='text-sm uppercase text-blue-100 tracking-wide'>
                        Total Request
                    </h2>
                    <p className='text-4xl font-bold mt-2'>
                        {data.total_requests}
                    </p>
                 </div>
                 <div className='bg-white shadow-mg rounded-xl p-6 border border-gray-100'>
                    <h2 className='text-lg font-semibold mb-4 text-gray-700'>
                        Last Request
                    </h2>
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm'>
                        <div className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
                            <p className='text-xs text-gray-500 mb-1'>Path</p>
                            <p className='font-medium text-gray-800 break-all'>
                                {data.last_requests?.Path}
                            </p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
                            <p className='text-xs text-gray-500 mb-1'>Method</p>
                            <p className='font-medium text-gray-800 break-all'>{data.last_requests?.Method}</p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
                            <p className='text-xs text-gray-500 mb-1'>Status</p>
                            <p className={`font-semibold ${
                                data.last_requests?.StatusCode >= 200 && data.last_requests?.StatusCode < 300
                                ? "text-green-600"
                                : data.last_requests?.StatusCode >= 300 && data.last_requests?.StatusCode < 400
                                ? "text-yello-600"
                                : "text-red-600"
                            }`}>
                                {data.last_requests?.StatusCode || "-"}
                            </p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
                            <p className='text-xs text-gray-500 mb-1'>IP</p>
                            <p className='font-medium text-gray-800 mb-1'>{data.last_requests?.IPAddress}</p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
                            <p className='text-xs text-gray-500 mb-1'>Latency</p>
                            <p className='font-medium text-gray-800 mb-1'>{data.last_requests?.Latency} ms</p>
                        </div>
                        <div className='bg-gray-50 rounded-lg p-3 border border-gray-100'>
                            <p className='text-xs text-gray-500 mb-1'>Time</p>
                            <p>{data.last_requests?.CreatedAt ? new Date(data.last_requests.CreatedAt).toLocaleString() : "-"}</p>
                        </div>
                    </div>
                 </div>
                 <div className='absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl'></div>
                </>
            )
            }
        </div>
    </div>
  )
}

export default MyUsage