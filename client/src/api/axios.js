import axios from "axios"

const api = axios.create({
    baseURL:"https://api-analytics-dashboard-xz14.onrender.com",
    withCredentials:true,
    headers:{
        "Content-Type":"application/json",
    }
})

api.interceptors.response.use(
    (response)=>response,
    (error) => {
        return Promise.reject(error)
    }
)

export default api