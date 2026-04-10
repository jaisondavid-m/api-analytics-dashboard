import React, { useState } from 'react'
import api from '../api/axios'

function ReqSide() {
  const [method, setMethod] = useState("GET")
  const [body, setBody] = useState(`{
    "name":"User"
}`)
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const endpoints = {
    GET: "/test/get",
    POST: "/test/post",
    PUT: "/test/put",
    PATCH: "/test/patch",
    DELETE: "/test/delete"
  }
  const sendRequest = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)
    try {
      const url = endpoints[method]
      let res
      if (method === "GET" || method === "DELETE") {
        res = await api({ method, url })
      } else {
        let parsedBody = {}
        try {
          parsedBody = JSON.parse(body)
        } catch (e) {
          setError("InValid JSON body")
          setLoading(false)
          return
        }
        res = await api({ method, url, data: parsedBody })
      }
      setResponse(res.data)
    } catch (err) {
      setError(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='h-full flex flex-col bg-[#020617] text-white'>
      <div className='px-6 py-3 border-b border-gray-800 flex items-center justify-between'>
        <h1 className='text-lg font-semibold'>API Request</h1>
      </div>
      <div className='p-6 space-y-4 w-full max-w-2xl'>
        <div className='flex gap-2'>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className='px-3 py-2 rounded-md font-semibold bg-gray-800 text-white'
          >
            {Object.keys(endpoints).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            value={endpoints[method]}
            readOnly
            className='flex-1 px-3 py-2 rounded-md bg-gray-900 text-gray-400'
          />
        </div>
        {(method !== "GET" && method !== "DELETE") && (
          <div>
            <label className='block mb-2 text-sm text-gray-400'>JSON Body:</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={3}
              className='w-full h-20 bg-gray-900 p-3 rounded-lg font-mono text-sm border border-gray-700 focus:border-blue-500 outline-none'
            />
          </div>
        )}
        <button onClick={sendRequest} className='w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold' disabled={loading} >
          {loading ? "Sending..." : "Send Request"}
        </button>
        {error && (
          <div
            className='bg-red-500/10 text-red-400 p-3 rounded-lg text-sm'
          >
            {JSON.stringify(error, null, 2)}
          </div>
        )}
      </div>

      <div className='flex-1 border-t border-gray-800 p-6 overflow-auto'>
        <h2 className='text-sm text-gray-400 mb-2'>Response</h2>
        <div className='bg-black border border-gray-800 rounded-lg p-4 h-[400px]'>
          {!response && !error && (
            <p className='text-gray-500 text-sm'>No Response Yet..</p>
          )}
          {response && (
            <pre className='text-green-400 text-sm whitespace-pre-wrap'>
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>
      </div>

    </div>
  )
}

export default ReqSide