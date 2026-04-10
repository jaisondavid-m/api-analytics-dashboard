import api from "./axios"

export const UserUsage = (data) => {
    return api.post(`/auth/usage/${data}`)
}

export const UserRequests = (data) => {
    return api.get(`/auth/users/${data}/dashboard`)
}

//overall
export const GetUsersList = ()=> {
    return api.get("/auth/users")
}

export const AllUsersUsage = ()=> {
    return api.get("/auth/usage/users")
}

export const CountryUsage = ()=> {
    return api.get("/auth/usage/countries")
}

export const DailyUsage = ()=> {
    return api.get("/auth/usage/daily")
}