import api from "./axios"

export const loginUser = (data)=>{
    return api.post("/auth/login",data)
}

export const registerUser = (data)=>{
    return api.post("/auth/register",data)
}

export const logoutUser = ()=>{
    return api.post("/auth/logout")
}

export const getCurrentUser = ()=>{
    return api.get("/auth/me")
}

export const RefreshToken = ()=>{
    return api.get("/auth/refresh")
}

export const DeleteUser = (id)=>{
    return api.delete(`/auth/user/${id}`)
}

export const BanUser = (id)=>{
    return api.patch(`/auth/user/ban/${id}`)
}

export const UnBanUser = (id) => {
    return api.patch(`/auth/user/unban/${id}`)
}

export const BanStatus = (id)=>{
    return api.get(`/auth/user/ban-status/${id}`)
}