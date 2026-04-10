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
        <div className='flex items-center gap-2'>
          <button
            onClick={() => setIsLive(false)}
            className={`px-4 py-1 text-xs cursor-pointer rounded-full font-medium transition ${!isLive ? "bg-red-500/30 text-red-400 border" : "bg-red-500/10 text-red-400"
              } bg-red-500/20 text-red-400`}
          >
            ○ Pause
          </button>
          <button
            onClick={() => setIsLive(true)}
            className={`px-4 py-1 text-xs cursor-pointer rounded-full font-medium transition ${isLive ? "bg-green-500/30 text-green-400 border" : "bg-green-500/10 text-green-400"
              }`}
          >
            ● Live
          </button>
        </div>

      </div>

      <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
        {
          logs.length === 0 ? (
            <p className='text-gray-300'>No Logs Found</p>
          ) : (
            logs.map((log, i) => (
              <div key={i} className='group relative rounded-xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#020617] p-4 mb-3 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300'>
                <div className='flex items-center justify-between mb-2'>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full tracking-wide ${methodColors[log.Method] || "bg-gray-600"}`}>{log.Method}</span>
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full ${log.StatusCode >= 200 && log.StatusCode < 300 ? "bg-green-500/20 text-green-400" : log.StatusCode >= 300 && log.StatusCode < 400 ? "text-yellow-400" : "text-red-400"}`}>
                    {log.StatusCode}
                  </span>
                </div>
                <div className='text-sm text-gray-200 gont-mono break-all'>{log.Path}</div>
                <div className='flex flex-wrap items-center justify-between mt-2 text-xs text-gray-400 gap-2'>
                  <span className='bg-white/5 px-2 py-0.5 rounded'>
                    🌐 IP: {log.IPAddress}
                  </span>
                  <span className='bg-white/5 px-2 py-0.5 rounded'>
                    {log.Latency} ms
                  </span>
                </div>

                <div className='mt-2 text-[11px] text-gray-500 flex flex-wrap justify-between gap-1'>
                  <span>{log.CreatedAt ? new Date(log.CreatedAt).toLocaleString() : "No TimeStamp"}</span>
                  <span className='text-blue-400'>👤{log.UserID}</span>
                </div>
                {log.RequestBody && (
                  <div className='mt-3'>
                    <div className='text-[10px] text-gray-400 mb-1 uppercase tracking-wider'>
                      Request Body
                    </div>
                    <pre className='text-xs bg-black/60 p-3 backdrop-blur rounded-lg overflow-x-auto border border-white/10'>
                      {log.RequestBody}
                    </pre>
                  </div>
                )}
                <div className='absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none' />
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