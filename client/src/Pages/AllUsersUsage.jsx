import React, { useEffect, useState } from "react"
import { AllUsersUsage } from "../api/analytics"
import Navbar from "../Components/Navbar.jsx"
import Loading from "../Components/Loading.jsx"

function AllUsersUsagePage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsage = async () => {
        try {
            const res = await AllUsersUsage()
            setUsers(res.data || [])
        } catch (err) {
            console.error("Failed To Fetch Usage : ", err)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUsage()
    }, [])

    const formatDate = (date) => {
        return new Date(date).toLocaleString()
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">All Users Usage</h1>
                {loading ? (
                    <Loading />
                ) : (
                    <div className="bg-white shadow-md rounded-2xl overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-200 text-gray-700">
                                <tr>
                                    <th className="p-3">User ID</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Total Requests</th>
                                    <th className="p-3">Last Request</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map((user,index) => (
                                        <tr key={user.ID} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-3 font-medium">{user.user_id}</td>
                                            <td>{user.name}</td>
                                            <td className="p-3 text-blue-600 font-semibold">
                                                {user.total_requests}
                                            </td>
                                            <td className="p-3 text-gray-600">
                                                {formatDate(user.last_request_at)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4 text-gray-500">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AllUsersUsagePage