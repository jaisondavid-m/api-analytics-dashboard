import React, { useEffect, useState } from 'react'
import Navbar from "../Components/Navbar"
import { GetUsersList } from '../api/analytics'
// import { DeleteUser } from '../api/auth'
import Loading from "../Components/Loading.jsx"


function UsersList() {
  const [users, setUsers] = useState([])
  const [loading,setLoading]=useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await GetUsersList()
        setUsers(res.data || [])
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
    if(!confirmDelete) return
    try {
      // await DeleteUser(id) for project presentation to public it is in off
      setUsers((prev)=>prev.filter((user)=>user.ID !== id))
    } catch (err){
      alert("Failed to Delete User")
    }
  }
  if(loading){
    <div>
      <Loading/>
    </div>
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
                        onClick={()=>handleDeleteUser(user.ID)}
                        className='px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition'
                      >
                      🗑 Delete
                      </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="7" className='text-center py-6 text-gray-500'>
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