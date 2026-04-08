import React, { useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../api/auth'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../context/AuthContext'

function AuthPage() {
    const { setUser , user,loading } = useAuth()
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")
    const navigate = useNavigate()
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
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            setMessage("")
            if (isLogin ? (!form.user_id || !form.password) : (!form.name || !form.user_id || !form.password)) {
                setType("error")
                setMessage("All fields are required")
                return
            }
            const payload = isLogin ? { user_id: form.user_id, password: form.password } : form
            const res = isLogin ? await loginUser(payload) : await registerUser(payload)
            const me = await getCurrentUser()
            setUser(me.data.user)
            setType("success")
            setMessage(res.data.message)
            navigate("/home")
        } catch (err) {
            setType("error")
            setMessage(err.response?.data?.error || "Failed to Login/Register")
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        if(!loading && user){
            navigate("/home")
        }
    },[user,loading])
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center text-white px-4 sm:px-6'>
            <div className='bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-full max-w-md'>
                <h1 className='text-xl sm:text-2xl font-bold text-center mb-6'>API Analytics Site</h1>
                <div className='bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full'>
                    <div className='flex gap-2 sm:gap-4 mb-4 bg-white/10 rounded-xl p-1'>
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
                    <form onSubmit={handleSubmit} className='space-y-3 text-gray-800'>
                        {!isLogin && (
                            <input type="text" name='name' placeholder='Enter Your Name' value={form.name} onChange={handleChange} className='w-full p-2 sm:p-3 border rounded-xl' />
                        )}
                        <input type="text" name='user_id' placeholder={isLogin ? 'Enter Your User ID' : 'Set Your User ID'} value={form.user_id} onChange={handleChange} className='w-full p-2 sm:p-3 border rounded-xl' />
                        <input type="password" name='password' placeholder={isLogin ? 'Enter Your Password' : 'Set Your Password'} value={form.password} onChange={handleChange} className='w-full p-2 sm:p-3 border rounded-xl' />
                        <button disabled={isLoading} type='submit' className='w-full bg-blue-500 text-white p-2 sm:p-3 rounded'>
                            {isLoading ? "Please wait..." : (isLogin ? "Login" : "Register")}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthPage