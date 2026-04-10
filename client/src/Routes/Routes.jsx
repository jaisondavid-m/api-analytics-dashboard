import React from 'react'
import { Routes , Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import Authpage from "../Pages/AuthPage"
import Home from '../Pages/Home'
import MainConent from '../Pages/MainConent'
import PageNotFound from "../Pages/PageNotFound.jsx"
import Profile from "../Pages/Profile.jsx"
import UsersList from "../Pages/UsersList.jsx"
import Analytics from "../Pages/Analytics.jsx"

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PublicRoute><Authpage/></PublicRoute>}/>
      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/logs' element={<ProtectedRoute><MainConent/></ProtectedRoute>}/>
      <Route path='profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
      <Route path='/users' element={<ProtectedRoute><UsersList/></ProtectedRoute>}/>
      <Route path='/analytics' element={<ProtectedRoute><Analytics/></ProtectedRoute>}/>
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
  )
}

export default AppRoutes