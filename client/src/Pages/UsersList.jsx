import React, { useEffect, useState } from 'react'
import { useQueries , usemutation , useQueryClient } from '@tanstack/react-query'
import Navbar from "../Components/Navbar"
import { GetUsersList } from '../api/analytics'
import { BanUser, UnBanUser } from "../api/auth.js"
// import { DeleteUser } from '../api/auth'
import Loading from "../Components/Loading.jsx"


function UsersList() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [banloading, setBanLoading] = useState(false)
  const STORAGE_KEY = "demo_banned_users"
  const getBannedUsers = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
  }
  const saveBannedUsers = (data) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await GetUsersList()
        const bannedUsers = getBannedUsers()
        const updateUsers = (res.data || []).map((user) => ({
          ...user,
          isBanned: bannedUsers.includes(user.ID)
        }))
        setUsers(updateUsers)
      } catch (err) {
        alert("error", err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm(" Delete This User ? ")
    if (!confirmDelete) return
    try {
      await DeleteUser(id)
    } catch (err) {
      alert("Failed to Delete User")
    }
  }
  const FakeHandleDeleteUser = (id) => {
    const confirmDelete = window.confirm("Delete this user?")
    if (!confirmDelete) return
    setUsers((prev) => prev.filter((user) => user.ID !== id))
  }
  const handleBanToggle = async (id, isBanned) => {
    try {
      setBanLoading(true)
      if (isBanned) {
        await UnBanUser(id)
      } else {
        await BanUser(id)
      }
      setUsers((prev) => prev.map((user) => user.ID === id ? { ...user, isBanned: !isBanned } : user))
    } catch (err) {
      alert("Failed to Update Ban Status")
    } finally {
      setBanLoading(false)
    }
  }
  const fakeHandleBanToggle = async (id, isBanned) => {
    try {
      setBanLoading(true)
      let bannedUsers = getBannedUsers()
      if (isBanned) {
        bannedUsers = bannedUsers.filter((userId) => userId !== id)
      } else {
        bannedUsers.push(id)
      }
      saveBannedUsers(bannedUsers)
      setUsers((prev) => prev.map((user) => user.ID === id ? { ...user, isBanned: !isBanned } : user))
    } catch (err) {
      alert("Failed to update status")
    } finally {
      setBanLoading(false)
    }
  }

  if (loading) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loading />
      </div>
    )
  }
  return (
    <div className='h-screen bg-gray-50'>
      <Navbar />
      <div className='p-6'>
        <h1 className='text-2xl font-semibold mb-4'>Users List</h1>
        <div className='overflow-x-auto bg-white shadow rounded-xl'>
          <table className='min-w-full text-sm text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-4 py-3'>Name</th>
                <th className='px-4 py-3'>User ID</th>
                <th className='px-4 py-3'>Role</th>
                <th className='px-4 py-3'>IP Address</th>
                <th className='px-4 py-3'>Last Login</th>
                <th className='px-4 py-3'>Created At</th>
                <th className='px-4 py-3 text-center'>Status</th>
                <th className='px-4 py-3 text-center'>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.ID} className='border-t hover:bg-gray-50'>
                  <td className='px-4 py-3'>{user.Name}</td>
                  <td className='px-4 py-3'>{user.UserID}</td>
                  <td className='px-4 py-3 capitalize'>{user.Role}</td>
                  <td className='px-4 py-3'>{user.LastLoginIP}</td>
                  <td className='px-4 py-3'>
                    {user.LastLoginAt
                      ? new Date(user.LastLoginAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className='px-4 py-3'>
                    {user.CreatedAt
                      ? new Date(user.CreatedAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className='px-4 py-3 text-center'>
                    <button
                      onClick={() => fakeHandleBanToggle(user.ID, user.isBanned)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium text-white transition ${user.isBanned
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-yellow-500 hover:bg-yellow-600"
                        }`}
                    >
                      {banloading ? "Please wait.." : user.isBanned ? "UnBan" : "🚫 Ban"}
                    </button>
                  </td>
                  <td className='px-4 py-3 text-center'>
                    <button
                      onClick={() => FakeHandleDeleteUser(user.ID)}
                      className='px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition'
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="8" className='text-center py-6 text-gray-500'>
                    No Users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UsersList