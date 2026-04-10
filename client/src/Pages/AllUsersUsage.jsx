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
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">All Users Usage</h1>
                    <p className="text-sm text-gray-500 mt-1">Monitor API usage across all users</p>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loading />
                    </div>

                ) : (
                    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                                    <tr>
                                        <th className="p-3">User ID</th>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Total Requests</th>
                                        <th className="p-3">Last Request</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length > 0 ? (
                                        users.map((user, index) => (
                                            <tr key={user.ID} className={`border-t hover:bg-blue-50/40 transition duration-200 ${index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                                }`}>
                                                <td className="p-4 font-semibold text-gray-800">{user.user_id}</td>
                                                <td className="p-4 text-gray-600">{user.name}</td>
                                                <td className="p-4">
                                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-600">
                                                        {user.total_requests}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-gray-500 text-sm">
                                                    {formatDate(user.last_request_at)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center p-6 text-gray-400">
                                                No Data Found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default AllUsersUsagePage