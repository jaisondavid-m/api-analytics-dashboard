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
  const methodColors = {
    GET: "bg-blue-500",
    POST: "bg-green-500",
    PUT: "bg-yellow-500",
    PATCH: "bg-indigo-500",
    DELETE: "bg-red-500",
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
    <div className='flex flex-col h-full bg-[#0f172a] text-white'>
      <div className='sticky top-0 z-10 bg-[#0f172a]/70 backdrop-blur-md px-4 py-3 border-b border-gray-800 flex justify-between items-center'>
        <h1 className='text-lg font-semibold'>Logs</h1>
        <button
          onClick={() => setIsLive(prev => !prev)}
          className={`px-4 py-1 text-xs cursor-pointer rounded-full font-medium ${isLive ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
        >
          {isLive ? "● Live" : "○ Paused"}
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {
          logs.length === 0 ? (
            <p className='text-gray-300'>No Logs Found</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className='border border-gray-800 py-3 px-2 hover:bg-white/5 transition'>
                <div className='flex items-center justify-between mb-1'>
                  <span className={`text-white font-semibold px-2 py-0.5 rounded ${methodColors[log.Method] || "bg-gray-500"}`}>{log.Method}</span>
                  <span className={`text-sm font-medium ${log.StatusCode >= 200 && log.StatusCode < 300 ? "text-green-400" : log.StatusCode >= 300 && log.StatusCode < 400 ? "text-yellow-400" : "text-red-400"}`}>
                    {log.StatusCode}
                  </span>
                </div>

                <div className='text-sm text-gray-200'>{log.Path}</div>
                <div className='text-cs text-gray-400 mt-1 flex justify-between'>
                  IP: {log.IPAddress} • {log.Latency} ms
                </div>
                <div className='text-[11px] text-gray-500 mt-1'>
                  {log.CreatedAt ? new Date(log.CreatedAt).toLocaleString() : "No TimeStamp"}
                </div>
                <div className='text-xs text-gray-400'>
                  User : {log.UserID}
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