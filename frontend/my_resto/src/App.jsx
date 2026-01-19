import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import User from './components/user/User'
import UserLanding from './components/user/UserLanding'
import ChefIndex from './components/staff/Index'
import AdminIndex from './components/admin/Index'
import StaffLogin from './components/staff/StaffLogin'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => {
      navigate("/staff/login", { replace: true })
    }

    window.addEventListener("unauthorized", handler)
    return () => window.removeEventListener("unauthorized", handler)
  }, [navigate])

  return (
    <>
      <Routes>
        <Route path='/menu' element={<User />} />
        <Route path='/scan/:qrToken' element={<UserLanding />} />


        <Route
          path="/staff/chef"
          element={
            <ProtectedRoute>
              <ChefIndex />
            </ProtectedRoute>
          }
        />

        <Route
          path="/staff/admin"
          element={
            <ProtectedRoute>
              <AdminIndex />
            </ProtectedRoute>
          }
        />
        <Route path='/staff/login' element={<StaffLogin />} />
      </Routes>
    </>
  )
}

export default App
