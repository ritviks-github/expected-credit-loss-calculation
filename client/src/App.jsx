import { useState } from 'react'
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './Login'
import DashboardAnalyst from './pages/DashboardAnalyst'
import DashboardCRO from './pages/DashboardCRO'
import Home from './pages/Home'

function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/dashboard-analyst' element = {<DashboardAnalyst />} />
        <Route path='/dashboard-cro' element={<DashboardCRO />} />
      </Routes>
    </>
  )
}

export default App
