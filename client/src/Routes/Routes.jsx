import React from 'react'
import { Routes , Route } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import Authpage from "../Pages/AuthPage"
import Home from '../Pages/Home'
import MainConent from '../Pages/MainConent'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PublicRoute><Authpage/></PublicRoute>}/>
      <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/logs' element={<ProtectedRoute><MainConent/></ProtectedRoute>}/>
    </Routes>
  )
}

export default AppRoutes
