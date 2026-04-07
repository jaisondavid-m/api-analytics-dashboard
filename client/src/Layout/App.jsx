import React from 'react' 
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from '../Pages/Home'
import AuthPage from '../Pages/AuthPage'
import MainConent from '../Pages/MainConent'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/logs' element={<MainConent/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App