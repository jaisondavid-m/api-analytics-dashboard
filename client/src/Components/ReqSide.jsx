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
    <div className='flex-1 overflow-y-auto p-6 bg-gradient-to-br from-slate-700 via-gray-700 to-black text-white'>
      <h1 className='text-3xl md:text-4xl font-bold mb-6'>API Tester</h1>
      <div className='mb-4 flex flex-col md:flex-row md:items-center gap-2'>
        <label className='font-medium'>HTTP Method:</label>
        <select value={method} onChange={(e)=>setMethod(e.target.value)} className='px-2 py-1 rounded-md cursor-pointer bg-gray-900 text-white'>
          {Object.keys(endpoints).map((m)=>(
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </div>
      {(method === "POST" || method === "PUT" || method === "PATCH" ) && (
        <div className='mb-4'>
          <label className='block mb-2 font-medium'>JSON Body:</label>
          <textarea value={body} onChange={(e)=>setBody(e.target.value)} rows={3} className='w-full text-black border p-3 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono'/>
        </div>
      )}
      <button onClick={sendRequest} className='border cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-105 transform transition duration-300 shadow-lg bg-blur-500 px-6 py-2 rounded-xl font-semibold' disabled={loading} >
        {loading ? "Sending..." : "Send Request" }
      </button>
      {error && (
        <div className='mt-4 bg-red-600 p-4 rounded-lg shadow'>
          <h2 className='font-semibold mb-1'>Error : </h2>
          <pre className='text-sm overflow-x-auto'>{JSON.stringify(error,null,2)}</pre>
        </div>
      )}
      {response && (
        <div className='mt-5 bg-gray-900 p-4 rounded-lg shadow'>
          <h2 className='font-semibold mb-1'>Response:</h2>
          <pre className='text-sm overflow-x-auto'>
            {JSON.stringify(response,null,2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ReqSide