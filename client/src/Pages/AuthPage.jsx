import React, { useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../api/auth'
import { useNavigate } from "react-router-dom"
import { motion , AnimatePresence } from "framer-motion"
import { useAuth } from '../context/AuthContext'
import { UserPlus , ArrowRight } from "lucide-react"

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
    const generateGuestCredentials = () => {
        const random = Math.random().toString(36).substring(2,8)
        const timestamp = Date.now().toString().slice(-4)
        const user_id = `guest_${random}${timestamp}`
        const password = random + timestamp
        return {
            name: "Guest User",
            user_id,
            password,
        }
    }
    const handleGuestLogin = async () => {
        try {
            setIsLoading(true)
            setMessage("")
            setType("")

            const guest = generateGuestCredentials()

            await registerUser(guest)

            const me = await getCurrentUser()

            setUser(me.data.user)

            setType("Success")
            setMessage("Logged in as Guest")

            navigate("/home")

        } catch (err) {
            setType("error")
            setMessage(err.response?.data?.error || "Guest Login Failed" )
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
        <div className='min-h-screen flex items-center justify-start px-8 sm:px-16'
            style={{
                backgroundImage: `url('/image.png')`,
                backgroundSize:'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <motion.div
                className="absolute w-[500px] h-[500px] bg-blue-500/20 blur-3xl rounded-full"
                animate={{x:[0,40,0],y:[0,-40,0]}}
                transition={{duration:8 , repeat:Infinity }}
            />
            <motion.div 
                initial={{opacity:0,scale:0.9,y:20}}
                animate={{opacity:1,scale:1,y:0}}
                transition={{duration:0.6 , ease:"easeOut"}}
                className='bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md transition-all'
            >
                <h1 className='text-3xl font-extrabold text-center text-white mb-6'>API Analytics Site</h1>
                <div className='mb-5 rounded-2xl border border-amber-400/30 bg-amber/10 px-4 py-3 backdrop-blur-md'>
                    <div className='flex items-start gap-3'>
                        <div className='mt-0.5 text-amber-300'>⚠️</div>
                        <div>
                            <p className='text-sm font-semibold text-amber-200'>Network Recommendation</p>
                            <p className='text-xs sm:text-sm text-amber-100/90 leading-relaxed'>
                                Use a Personal network for better accessibility and performance.
                                Organizational or restricted networks may block access or cause slower connection
                            </p>
                        </div>
                    </div>
                </div>
                <div className='bg-white/10 backdrop-blur-md shadow-inner p-6 sm:p-8 rounded-2xl w-full'>
                    <div className='flex gap-2 sm:gap-4 mb-4 bg-white/10 rounded-xl p-1'>
                        <motion.button 
                            whileTap={{scale:0.95}}
                            className={`flex-1 cursor-pointer rounded-xl py-2 font-semibold sm:text-base transition-colors duration-200 ${isLogin ? "bg-blue-600 text-white shadow-md" : "bg-white/20 text-white hover:bg-white/30"}`}
                            onClick={() => setIsLogin(true)}
                        >Login</motion.button>
                        <motion.button 
                            whileTap={{scale:0.95}}
                            className={`flex-1 cursor-pointer rounded-xl py-2 font-semibold sm:text-base transition-colors duration-200 ${!isLogin ? "bg-blue-600 text-white shadow-md" : "bg-white/20 text-white hover:bg-white/30"}`}
                            onClick={() => setIsLogin(false)}
                        >Register</motion.button>
                    </div>
                    {message && (
                        <div className={`p-3 mb-4 rounded-xl text-sm font-medium ${type === "error" ? "bg-red-500/20 text-red-400 border border-red-500/30" : "bg-green-500/20 text-green-400 border border-green-500/30"}`}>
                            {message}
                        </div>
                    )}
                    <motion.form 
                        onSubmit={handleSubmit} 
                        className='space-y-4'
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden:{},
                            show: {
                                transition: {
                                    staggerChildren:0.1
                                }
                            }
                        }}
                    >
                        {!isLogin && (
                            <motion.input
                            variants={{hidden:{opacity:0,y:10},show:{opacity:1,y:0 }}} 
                                type="text" 
                                name='name' 
                                placeholder='Enter Your Name' 
                                value={form.name} 
                                onChange={handleChange} 
                                className='w-full p-3 border border-white/20 bg-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition' 
                            />
                        )}
                        <motion.input variants={{hidden:{opacity:0,y:10},show:{opacity:1,y:0}}} type="text" name='user_id' placeholder={isLogin ? 'Enter Your User ID' : 'Set Your User ID'} value={form.user_id} onChange={handleChange} className='w-full p-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition' />
                        <motion.input variants={{hidden:{opacity:0,y:10},show:{opacity:1,y:0}}} type="password" name='password' placeholder={isLogin ? 'Enter Your Password' : 'Set Your Password'} value={form.password} onChange={handleChange} className='w-full p-3 border border-white/20 rounded-xl bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition' />
                        <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} disabled={isLoading} type='submit' className='w-full bg-blue-600 text-white p-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed'>
                            {isLoading ? "Please wait..." : (isLogin ? "Login" : "Register")}
                        </motion.button>
                    </motion.form>
                    <div className='flex items-center gap-2 my-4'>
                        <div className='flex-1 h-px bg-white/20'/>
                        <span className='text-white/40 text-xs'>OR</span>
                        <div className='flex-1 h-px bg-white/20'/>
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleGuestLogin}
                        className={`mt-6 group cursor-pointer relative overflow-hidden rounded-2xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl
                                    p-5 flex items-center justify-between transition-all duration-300 hover:border-blue-400/40 hover:shadow-blue-500/10 ${isLoading ? "opacity-50 pointer-events-none" : "" } `}
                    >
                        <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10'/>
                        <div className='flex items-center gap-4 z-10'>
                            <div className='p-3 rounded-xl bg-blue-500/20 text-blue-400'>
                                <UserPlus className='w-5 h-5' />
                            </div>
                            <div>
                                <h3 className='text-white font-semibold text-sm sm:text-base'>Enter as Guest</h3>
                                <p className='text-white/50 text-xs sm:text-sm'>Instant Access without creating an account</p>
                            </div>
                        </div> 
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}

export default AuthPage