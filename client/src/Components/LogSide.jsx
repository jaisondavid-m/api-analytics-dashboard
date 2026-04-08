import React, { useEffect, useState, useRef } from 'react'
import { GetLogs } from '../api/content'

function LogSide() {
  const [logs, setLogs] = useState([])
  const [isLive, setIsLive] = useState(false)
  const bottomRef = useRef(null)
  const fetchLogs = async () => {
    try {
      const data = await GetLogs()
      if (Array.isArray(data)) {
        setLogs(data.reverse())
      } else {
        console.error("Invalid data:", data)
      }
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchLogs()
    let interval
    if (isLive) {
      interval = setInterval(() => {
        fetchLogs()
      }, 3000);
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isLive])
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs, isLive])

  return (
    <div className='flex flex-col flex-1 bg-gradient-to-br from-slate-700 via-gray-700 to-black p-4'>
      <div className='sticky top-0 z-10 bg-black/70 backdrop-blur-md p-4 border-b border-gray-600'>
        <h1 className='text-white text-bold text-2xl mb-4'>Request Logs</h1>
        <button
          onClick={() => setIsLive(prev => !prev)}
          className={`px-4 py-1 rounded text-sm font-semibold ${isLive ? "bg-red-500" : "bg-green-500"}`}
        >
          {isLive ? "Stop Live" : "Start Live"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {
          logs.length === 0 ? (
            <p className='text-gray-300'>No Logs Found</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className='bg-gray-800 text-white p-3 mb-3 rounded-lg shadow'>
                <div className='flex justify-between'>
                  <span className='text-bold'>{log.Method}</span>
                  <span className={`text-sm ${log.StatusCode === 200 || log.StatusCode === 201 ? "text-green-400" : "text-red-400"}`}>{log.StatusCode}</span>
                </div>
                <div className='text-sm text-gray-300'>{log.Path}</div>
                <div>
                  IP: {log.IPAddress} • {log.Latency} ms
                </div>
                <div className='text-xs text-gray-400'>
                  User : {log.UserID}
                </div>
                <div className='text-xs text-gray-500'>
                  {log.CreatedAt ? new Date(log.CreatedAt).toLocaleString() : "No TimeStamp"}
                </div>
                {log.RequestBody && (
                  <pre className='text-xs mt-2 bg-black p-2 rounded overflow-x-auto'>
                    {log.RequestBody}
                  </pre>
                )}
              </div>
            ))
          )
        }
        <div ref={bottomRef} />
      </div>
    </div>
  )
}

export default LogSide