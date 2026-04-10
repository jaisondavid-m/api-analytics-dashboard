import React, { useEffect, useState } from "react"
import { DailyUsage } from "../api/analytics"
import Loading from "../Components/Loading.jsx"

function DailyUsagePage() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await DailyUsage()
                const grouped = {}
                res.data.forEach(item => {
                    const date = item.Date.split("T")[0]
                    if (!grouped[date]) {
                        grouped[date] = 0
                    }
                    grouped[date] += item.TotalRequests
                })
                const formatted = Object.keys(grouped).map(date => ({
                    date, total: grouped[date]
                }))
                setData(formatted)
            } catch (err) {
                console.error("Failed To Fetch daily Usage", err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <Loading />
                </div>
            ) : (
                <div>
                    <div className="p-5 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800">Daily Usage</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            API requests trends by date
                        </p>
                    </div>
                    <div>
                        <div className="p-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl shadow-md">
                            <p className="text-sm opacity-80">Total Days</p>
                            <p className="text-2xl font-bold">{data.length}</p>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-600 test-sm uppercase tracking-wide">
                                <tr>
                                    <th className="p-3">Date</th>
                                    <th className="p-3">Total Requests</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length > 0 ? (
                                    data.map((d, index) => (
                                        <tr
                                         key={index}
                                         className={`border-t transition duration-200 hover:bg-indigo-50/40 ${
                                            index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                                         }`}
                                        >
                                            <td className="p-3 py-1 rounded-full text-sm font-semibold bg-indigo-100 text-indigo-600">📅 {d.date}</td>
                                            <td className="p-3 text-blue-600 font-semibold">
                                                {d.total}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="2" className="text-center p-6 text-gray-400">
                                            No daily usage data available
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>

            )}
        </div>
    )

}

export default DailyUsagePage