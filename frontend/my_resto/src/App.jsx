import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import User from './components/user/User'
import UserLanding from './components/user/UserLanding'
import ChefLayout from './components/staff/Index'
import AdminLayout from './components/admin/Index'
import StaffLogin from './components/staff/StaffLogin'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './components/admin/Dashboard'
import AdminMenu from './components/admin/Menu'
import Table from './components/admin/Table'
import Staff from './components/admin/Staff'
import Report from './components/admin/Report'
import Orders from './components/admin/Orders'
import Test from './components/Test'
import NotFound from './components/NotFound'

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
        {/* Public */}
        <Route path="/" element={<Test />} />
        <Route path="/menu" element={<User />} />
        <Route path="/scan/:qrToken" element={<UserLanding />} />
        <Route path="/staff/login" element={<StaffLogin />} />
        <Route path="*" element={<NotFound />} />


        {/* Chef Protected */}
        <Route element={<ProtectedRoute allowedRoles={["chef"]} />}>
          <Route path="/staff/chef" element={<ChefLayout />}>
            <Route index element={<div>Chef Dashboard</div>} />
          </Route>
        </Route>

        {/* Admin Protected */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index path='dashboard' element={<Dashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="menu" element={<AdminMenu />} />
            <Route path="tables" element={<Table />} />
            <Route path="staffs" element={<Staff /> } />
            <Route path="reports" element={<Report />} />
            
            
          </Route>
        </Route>
        <Route path='/staff/login' element={<StaffLogin />} />
      </Routes>
    </>
  )
}

export default App
