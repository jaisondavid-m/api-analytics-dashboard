import React , { useEffect , useState } from "react"
import { CountryUsage } from "../api/analytics.js"
import Loading from "../Components/Loading.jsx"

function CountryUsagePage() {
    const [countries,setCountries] = useState([])
    const [loading,SetLoading] = useState(true)
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const res = await CountryUsage()
                setCountries(res.data || [])
            } catch (err) {
                console.error("Failed To Fetch Country Usage",err)
            } finally {
                SetLoading(false)
            }
        }
        fetchData()
    },[])

    return (
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
            {loading ? (
                <Loading/>
            ) : (
                <table className="w-full text-left">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-3">Country</th>
                            <th className="p-3">Total Requests</th>
                            <th className="p-3">Last Updated</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countries.length > 0 ? (
                            countries.map((c)=> (
                                <tr key={c.ID} className="border-t">
                                    <td className="p-3">{c.Country}</td>
                                    <td className="p-3 text-blue-600 font-semibold">{c.TotalRequests}</td>
                                    <td className="p-3">{new Date(c.UpdatedAt).toLocaleString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center p-4">No Data</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CountryUsagePage