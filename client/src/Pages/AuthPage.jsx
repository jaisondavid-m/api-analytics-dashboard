import React, { useState } from 'react'
import axios from "axios"

function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const [form, setForm] = useState({
        name: "",
        user_id: "",
        password: "",
    })
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            setMessage("")
            if (isLogin ? ( !form.user_id   || !form.password) : (!form.name || !form.user_id   || !form.password )) {
                setType("error")
                setMessage("All fields are required")
                return
            }
            const url = isLogin ? "http://localhost:8000/auth/login" : "http://localhost:8000/auth/register"
            const payload = isLogin ? { user_id: form.user_id, password: form.password } : form
            const res = await axios.post(url, payload, { withCredentials: true })
            setType("sucess")
            setMessage(res.data.message)
            setTimeout(() => {
                window.location.href = "/home"
            }, 1000);
        } catch (err) {
            setType("error")
            setMessage(err.response?.data?.error || "Failed to Login/Register")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <div className='h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center text-white px-4'>
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>API Analytics Site</h1>
                <div className='bg-white p-6 rounded-2xl shadow-md w-96'>
                    <div className='flex gap-4 mb-4 bg-white/10 rounded-xl p-1'>
                        <button className={`flex-1 rounded-2xl p-2 ${isLogin ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-black"}`}
                            onClick={() => setIsLogin(true)}
                        >Login</button>
                        <button className={`flex-1 rounded-2xl p-2 ${!isLogin ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-black"}`}
                            onClick={() => setIsLogin(false)}
                        >Register</button>
                    </div>
                    {message && (
                        <div className={`p-3 mb-4 rounded-xl text-sm font-medium ${type === "error" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30"}`}>
                            {message}
                        </div>
                    )}
                    <div className='space-y-3 text-gray-800'>
                        {!isLogin && (
                            <input type="text" name='name' placeholder='Enter Your Name' value={form.name} onChange={handleChange} className='w-full p-2 border rounded-xl' />
                        )}
                        <input type="text" name='user_id' placeholder={isLogin ? 'Enter Your User ID' : 'Set Your User ID'} value={form.user_id} onChange={handleChange} className='w-full p-2 border rounded-xl' />
                        <input type="password" name='password' placeholder={isLogin ? 'Enter Your Password' : 'Set Your Password'} value={form.password} onChange={handleChange} className='w-full p-2 border rounded-xl' />
                        <button disabled={isLoading} onClick={handleSubmit} className='w-full bg-blue-500 text-white p-2 rounded'>
                            {isLoading ? "Please wait..." : (isLogin ? "Login" : "Register")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage