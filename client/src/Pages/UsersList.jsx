import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import { GetUsersList } from '../api/analytics'

function UsersList() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetUsersList()
        setUsers(res.data || [])
      } catch (err) {
        alert("error", err)
      }
    }
    fetchData()
  }, [])
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
                    {user.CreatedAt
                      ? new Date(user.LastLoginAt).toLocaleString()
                      : "-"}
                  </td>
                  <td className='px-4 py-3'>
                    {user.CreatedAt
                      ? new Date(user.CreatedAt).toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="6" className='text-center py-6 text-gray-500'>
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