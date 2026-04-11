import React, { lazy, useState } from "react"
import { BarChart3 , Users , Globe , Calendar, UsersIcon } from "lucide-react"
import Navbar from "../Components/Navbar.jsx"

const MyUsage = lazy(()=>import("./MyUsage.jsx"))
const AllUsersUsagePage = lazy(()=>import("./AllUsersUsage.jsx"))
const CountryUsagePage = lazy(()=>import("./CountryUsagePage.jsx"))
const DailyUsagePage = lazy(()=>import("./DailyUsagePage.jsx"))

function Analytics() {
    const [activeTab, setActiveTab] = useState("my")
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
            <Navbar />
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Monitor API usage , users and performance insights
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 mb-6 bg-white p-2 rounded-xl shadow-sm w-fit">
                    <button
                        onClick={() => setActiveTab("my")}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "my" ? "bg-blue-600 text-white shadow-md scale-105" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <BarChart3 size={16}/> My Usage
                    </button>
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${activeTab === "all" ? "bg-blue-600 text-white shadow-md scale-105" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                       <UsersIcon/> All Users Usage
                    </button>
                    <button
                        onClick={() => setActiveTab("country")}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "country" ? "bg-blue-600 text-white shadow-md scale-105" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <Globe/> Country Usage
                    </button>
                    <button
                        onClick={() => setActiveTab("daily")}
                        className={`px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "daily" ? "bg-blue-600 text-white shadow-md scale-105" : "text-gray-600 hover:bg-gray-100"
                            }`}
                    >
                        <Calendar/> Daily Usage
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100">
                    <div className="transition-all duration-300 ease-in-out">
                        {activeTab === "my" && <MyUsage />}
                        {activeTab === "all" && <AllUsersUsagePage />}
                        {activeTab === "country" && <CountryUsagePage />}
                        {activeTab === "daily" && <DailyUsagePage />}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Analytics