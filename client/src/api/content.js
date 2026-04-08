import api from "./axios"

export const  GetLogs = async ()=>{
    const res = await api.get("/auth/logs")
    return res.data
}