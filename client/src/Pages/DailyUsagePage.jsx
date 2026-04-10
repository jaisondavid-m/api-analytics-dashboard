import React , { useEffect , useState } from "react"
import { DailyUsage } from "../api/analytics"
import Loading from "../Components/Loading.jsx"

function DailyUsagePage() {
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
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
                    date,total : grouped[date]
                }))
                setData(formatted)
            } catch (err) {
                console.error("Failed To Fetch daily Usage",err)
            } finally {
                setLoading(false)
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
                            <th className="p-3">Date</th>
                            <th className="p-3">Total Requests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((d,index)=>(
                                <tr key={index} className="border-t">
                                    <td className="p-3">{d.date}</td>
                                    <td className="p-3 text-blue-600 font-semibold">
                                        {d.total}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center p-4">
                                    No Data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    )

}

export default DailyUsagePage