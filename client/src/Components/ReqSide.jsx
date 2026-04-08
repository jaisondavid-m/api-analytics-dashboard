import React, { useState } from 'react'
import api from '../api/axios'

function ReqSide() {
  const [method, setMethod] = useState("GET")
  const [body, setBody] = useState("{}")
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
        res = await api({method,url,data:parsedBody})
      }
      setResponse(res.data)
    } catch (err) {
      setError(err.response?.data || err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-600 via-gray-600 to-black text-white'>
      <h1 className='text-2xl font-bold mb-4'>API Tester</h1>
      <div className='mb-4'>
        <label className='mr-2'>Method:</label>
        <select value={method} onChange={(e)=>setMethod(e.target.value)} className='text-black px-2 py-1 rounded'>
          {Object.keys(endpoints).map((m)=>(
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      {(method === "POST" || method === "PUT" || method === "PATCH" ) && (
        <div className='mb-4'>
          <label className='block mb-1'>JSON Body:</label>
          <textarea value={body} onChange={(e)=>setBody(e.target.value)} rows={6} className='w-full text-black p-2 rounded'/>
        </div>
      )}
      <button onClick={sendRequest} className='bg-blur-500 px-4 py-2 rounded font-semibold' disabled={loading} >
        {loading ? "Sending..." : "Send Request" }
      </button>
      {error && (
        <div className='mt-4 bg-red-600 p-3 rounded'>
          <pre>{JSON.stringify(error,null,2)}</pre>
        </div>
      )}
      {response && (
        <div className='mt-4 bg-gray-900 p-3 rounded'>
          <h2 className='font-semibold mb-2'>Response:</h2>
          <pre className='text-sm overflow-x-auto'>
            {JSON.stringify(response,null,2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ReqSide