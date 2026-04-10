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
    <div className='min-h-screen bg-gray-50'>
        <div className='p-6'>
            <h1 className='text-2xl font-semibold mb-6'>My Usage</h1>
            {!data ? (
                <Loading/>
            ) : (
                <>
                 <div className='bg-white shadow rounded-xl p-6 mb-6'>
                    <h2 className='text-lg font-medium text-gray-600'>
                        Total Request
                    </h2>
                    <p className='text-3xl font-bold mt-2'>
                        {data.total_requests}
                    </p>
                 </div>
                 <div className='bg-white shadow rounded-xl p-6'>
                    <h2 className='text-lg font-medium mb-4 text-gray-600'>
                        Last Request
                    </h2>
                    <div className='grid grid-cols-2 gap-4 text-sm'>
                        <p><strong>Path:</strong>{data.last_requests?.path}</p>
                        <p><strong>Method:</strong>{data.last_requests?.Method}</p>
                        <p><strong>Status:</strong>{data.last_requests?.StatusCode}</p>
                        <p><strong>IP:</strong>{data.last_requests?.IPAddress}</p>
                        <p>
                            <strong>Latency:</strong>{data.last_requests?.Latency} ms
                        </p>
                        <p>
                            <strong>Time:</strong>
                            {
                                data.last_requests?.CreatedAt ? new Date(data.last_requests.CreatedAt).toLocaleString() : "-"
                            }
                        </p>
                    </div>
                 </div>
                </>
            )
            }
        </div>
    </div>
  )
}

export default MyUsage