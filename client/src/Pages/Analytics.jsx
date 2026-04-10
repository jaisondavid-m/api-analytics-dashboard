import React , { useState } from "react"
import Navbar from "../Components/Navbar.jsx"
import MyUsage from "./MyUsage.jsx"
import AllUsersUsagePage from "./AllUsersUsage.jsx"
import CountryUsagePage from "./CountryUsagePage.jsx"
import DailyUsagePage from "./DailyUsagePage.jsx"

function Analytics() {
    const [activeTab,setActiveTab] = useState("my")
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar/>
            <div className="p-6">
                <h1 className="text-2xl font-semibold mb-6">Analytics Dashboard</h1>
                <div className="flex space-x-4 mb-6">
                    <button
                        onClick={()=>setActiveTab("my")}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            activeTab === "my" ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow"
                        }`}
                    >
                        My Usage
                    </button>
                    <button
                        onClick={()=>setActiveTab("all")}
                        className={`px-4 py-2 rounded-lg font-medium transition ${
                            activeTab === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700 shadow"
                        }`}
                    >
                        All Users Usage
                    </button>
                    <button
                        onClick={()=>setActiveTab("country")}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "country" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                    >
                        Country Usage
                    </button>
                    <button
                        onClick={()=>setActiveTab("daily")}
                        className={`px-4 py-2 rounded-lg ${
                            activeTab === "daily" ? "bg-blue-600 text-white" : "bg-white"
                        }`}
                    >
                        Daily Usage
                    </button>
                </div>
                <div>
                    { activeTab === "my" && <MyUsage/> }
                    { activeTab === "all" && <AllUsersUsagePage/> }
                    { activeTab === "country" && <CountryUsagePage/> }
                    { activeTab === "daily" && <DailyUsagePage/> }
                </div>
            </div>
        </div>
    )
}
export default Analytics