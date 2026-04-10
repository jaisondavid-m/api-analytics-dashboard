import React, { useEffect, useState } from "react"
import { CountryUsage } from "../api/analytics.js"
import Loading from "../Components/Loading.jsx"

function CountryUsagePage() {
    const [countries, setCountries] = useState([])
    const [loading, SetLoading] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await CountryUsage()
                setCountries(res.data || [])
            } catch (err) {
                console.error("Failed To Fetch Country Usage", err)
            } finally {
                SetLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className="p-2">
            <div className="bg-white shadow-lg rounded-2xl border border-gray-100 overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-40">
                        <Loading />
                    </div>

                ) : (
                    <div>
                        <div className="border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800">Country Usage</h2>
                            <p className="text-sm text-grray-500 mt-1">
                                API requests distribution by country
                            </p>
                        </div>
                        <div className="p-5">
                            <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl p-4 shadow-md">
                                <p className="text-sm opacity-80">Total Countries</p>
                                <p className="text-2xl font-bold">{countries.length}</p>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                                    <tr>
                                        <th className="p-3">Country</th>
                                        <th className="p-3">Total Requests</th>
                                        <th className="p-3">Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {countries.length > 0 ? (
                                        countries.map((c) => (
                                            <tr key={c.ID} className="border-t">
                                                <td className="p-4 font-medium text-gray-800">🌍 {c.Country}</td>
                                                <td className="p-4">
                                                    <span className="px-3 text-blue-600 font-semibold py-1 rounded-full text-sm bg-blue-100">{c.TotalRequests}</span>
                                                </td>
                                                <td className="p-4 text-gray-500 text-sm">{new Date(c.UpdatedAt).toLocaleString()}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center p-6 text-gray-400">No Country Usage data available</td>
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

export default CountryUsagePage