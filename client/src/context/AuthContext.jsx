import { createContext, useContext, useEffect, useState } from "react"
import { getCurrentUser } from "../api/auth"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const checkAuth = async () => {
        try {
            const res = await getCurrentUser()
            setUser(res.data.user)
        } catch (err) {
            setUser(null)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        checkAuth()
    },[])
    return (
        <AuthContext.Provider value={{user,setUser,loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)